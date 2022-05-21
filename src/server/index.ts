import express, {Express, Request, Response} from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { SHA256 } from 'crypto-js'
import Web3 from 'web3'
import session, {Session, SessionData} from 'express-session'
import {IncomingMessage} from 'http'
// import connectToDb from './mongooseConfig'
// import { Connection } from 'mongoose'
import MongoStore from 'connect-mongo'
import { Socket } from 'socket.io-client'


const web3:Web3 = new Web3(Web3.givenProvider)
web3.setProvider(new Web3.providers.HttpProvider('https://bscrpc.com'));

const app:Express = express()
const port:number = 3000
const server = http.createServer(app)

interface Database{
    [playerId: number]: Array<number>
}

interface SessionStorage{
    [playerId: string]: Session & Partial<SessionData>
}

interface ActivePlayers{
    [playerId: string]: boolean
}

type InputFromPlayer = {
    id:number
    x:number
    y:number

}

type Message = {
    id:number
    content:string
}

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


// needs to migrate to DB

// for hardcoded cords
const playersDb:Database = {
    0: [1, 480, 480],
    1: [1, 432, 336]
}

//======= DECLARATIONS ======

declare module 'express-session' {
    export interface SessionData {
      userId: string
    }
}

declare module 'http' {
    export interface IncomingMessage{
        session: any
    }
}

// declare module "sock" { 
//     export interface  {
//       session: any
//     }
//   }



Object.values(playersDb).forEach(playerData => {
    playerData[1] = playerData[1] / 1.5
    playerData[2] = playerData[2] / 1.5
})

const connectedPlayers:ActivePlayers = {} // i need to do connected players per map ;)

const NUMBER_OF_MAPS = 3

const oneDay = 86400000


// SESSION STUFF

// const connection:Connection = connectToDb()

const sessionStore:MongoStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/squ3',
    collectionName: 'sessions'
})

// EXPRESS MIDDLEWARE

app.use(cors())
app.use(express.json())


//app.use(express.urlencoded({extended:true})) //destroys everything??

const sessionMiddleware = session({
    secret: "juras2",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false,
    store: sessionStore
})

app.use(sessionMiddleware)

app.use('/scripts', express.static(path.join(process.cwd(), 'dist/client/scripts')))
app.use('/styles', express.static(path.join(process.cwd(), 'dist/client/styles')))
app.use('/assets', express.static(path.join(process.cwd(), 'assets')))



app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(process.cwd(), 'dist/client/tempauth.html'))
})

app.get('/game', (req:Request, res:Response) => {
    res.sendFile(path.join(process.cwd(), 'dist/client/index.html'))
})

app.get('/player', (req:Request, res:Response) => {
    const id:number = Number(req.query.id)
    if(isNaN(id)) return
    res.json({"map": playersDb[id][0]})
})

let authphrase = 'juras'
let hashedPhrase = SHA256(authphrase).toString()

app.get('/authphrase', (req:Request, res:Response) => { 
    res.json({hashedPhrase})
})

app.get('/getid', (req:Request, res:Response) => {

    if(req.session.userId){
        res.json({message: req.session.userId })
        return
    }

    res.json({message: "error" })

})

app.post('/auth', async (req:Request, res:Response) => {

    const singature:string = await req.body.signature
    const publicKey:string = await req.body.public_key
    
    const issuerPublicKey = await web3.eth.accounts.recover(hashedPhrase, singature)

    if(issuerPublicKey.toLocaleLowerCase() === publicKey ){
        req.session.userId = publicKey
        req.session.authenticated = true
        res.json({"key": "valid"})
        return
    }
    res.json({"key": "err"})
})

app.get('/logout', async (req:Request, res:Response) => {
    req.session.destroy(() => {
        res.json({message: "logout!"})
    })
})



app.get('/mapdata', (req:Request, res:Response) => {
    const id = req.query.id
    const playerDbFormated = Object.entries(playersDb)

    const result = playerDbFormated.filter(entry => entry[1][0] == id)
    
    const json = Object.fromEntries(result)
    res.json(json)

})





const mapsCache:Array<Array<InputFromPlayer>> = [[], [], [], [], []]


// SOCKET.IO PART

// MIDDLEWARE

const wrap = (middleware:any) => (socket:any, next:any) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.authenticated) {
      next();
    } else {
      next(new Error("unauthorized"));
    }
});


// SENDING PLAYER POSITIONS ACROSS ALL MAPS

for (let i = 1; i < NUMBER_OF_MAPS + 1; i++) {
    setTimeout(() => {
        setInterval(() => {
            mapsCache[i].forEach((data: InputFromPlayer) => {
                io.emit("map" + i + "recv", data)
            }); 
            

            mapsCache[i] = []
            
        }, 250)
    }, 50*i)
}


io.on("connection", socket => {

    console.log(socket.request.session)

    const playerId:string = socket.handshake.query.id as string
    if(playerId == 'null') return
    // if(playerId.length == 0) return

    const playerIdNum:number = Number(playerId)

    console.log("player " + playerId +" connected!")

    connectedPlayers[playerId] = true

    let location:InputFromPlayer = {id: -1, x: -1, y: -1};

    socket.on("changeMap", data => {
        playersDb[data.who][0] = data.to
        io.emit("changeMap", data)
        sendMapListener(data.to)
    })

    socket.on("disconnect", reason => {
        console.log("player " + playerId +" disconnected!")
        clearInterval(updatePositionInDBInterval)
        connectedPlayers[playerId] = false
        delete connectedPlayers[playerId]
    })


    sendMapListener(playersDb[playerIdNum][0])
    msgBroadcast(playersDb[playerIdNum][0])


    function msgBroadcast(_mapId:number){
        socket.on("map" + _mapId + "chat", (msg:Message) => {
            io.emit("map" + _mapId + "chat", msg)
        })
    }

    function sendMapListener(_mapId:number){
        socket.on("map" + _mapId+ "send", (data:InputFromPlayer) => {
            // console.log(_mapId)
            if(data.id == playerIdNum){
                location = data
                mapsCache[_mapId].push(data)
            } 
        })    
    }

    
    function updatePositionInDB(){
        if(location.id != -1){
        playersDb[playerIdNum][1] = location.x
        playersDb[playerIdNum][2] = location.y
        // console.log(playersDb[playerIdNum])
        }
    }

    const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000)

    // server-side validation -> trzeba zrobić!! JOI LIBRARY

})



server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})