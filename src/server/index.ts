import express, {Express, Request, Response} from 'express'
import path from 'path'
import http from 'http'
import fs from 'fs'
import { Server } from 'socket.io'
import cors from 'cors'
import { SHA256 } from 'crypto-js'
import Web3 from 'web3'
import session, {Session, SessionData} from 'express-session'
import {IncomingMessage} from 'http'
import MongoStore from 'connect-mongo'
import Contract from '../../contracts/artifacts/Squ3SkinsABI.json'
import {AbiItem} from 'web3-utils'
import pinataClient, { PinataPinOptions, PinataPinResponse } from '@pinata/sdk'
import 'dotenv/config' 


const web3:Web3 = new Web3(Web3.givenProvider)
web3.setProvider(new Web3.providers.HttpProvider('https://rpctest.meter.io/'));

const app:Express = express()
const port:number = 3000
const server = http.createServer(app)

interface Database{
    [playerId: string]: Array<number>
}

interface ActivePlayers{
    [playerId: string]: boolean
}

type InputFromPlayer = {
    id:string
    x:number
    y:number
}

interface PlayerMap{
    [playerId: string]: number
}

type PlayerCords = {
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
// const playersDb:Database = {
//     "0xadc35b0f0eb14709cbcf28086c505ea976bf8c99": [-1, 480, 480],
//     "0x1fb0d6ecb9709b539013c05b6c96201501ee68df": [-1, 432, 336],
//     "0x74c4b10f277a59a07be24c0aea1884f9fefeb5c5": [-1, 480, 336]
// }


const playersDb:Database = {}
const lastMap:PlayerMap = {}


// console.log(process.env.PINATA_API_KEY)
// const lastMap:PlayerMap = {
//     "0x1fb0d6ecb9709b539013c05b6c96201501ee68df": 1,
//     "0x74c4b10f277a59a07be24c0aea1884f9fefeb5c5": 1,
//     "0xadc35b0f0eb14709cbcf28086c505ea976bf8c99": 1

// }

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


Object.values(playersDb).forEach(playerData => {
    playerData[1] = playerData[1] / 1.5
    playerData[2] = playerData[2] / 1.5
})

const connectedPlayers:ActivePlayers = {} // i need to do connected players per map ;)

const NUMBER_OF_MAPS = 3

const oneDay = 86400000


// === WEB3 ===

// contract address: 0x425493f30662deB8722ca13DBf265E9a9cfC2CC2

let abi = Contract
const contractAddress = "0x425493f30662deB8722ca13DBf265E9a9cfC2CC2"
let contract = new web3.eth.Contract(abi as AbiItem[], contractAddress)

// function setContractInterface():void{

// }

async function getNftURI(_id:string, _indx:number):Promise<string>{

    try{
        const tokenId = await contract.methods.tokenOfOwnerByIndex(_id, _indx).call()
        const uri = await contract.methods.tokenURI(tokenId).call()
        return uri
    }catch(err){
        return "err"
    }
    
     
    // console.log(tokenId)
    
    
}

const pinata = pinataClient(process.env.PINATA_API_KEY as string, process.env.PINATA_SECRET as string)

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log('Pinata status:')
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});






// SESSION STUFF

// const connection:Connection = connectToDb()

const sessionStore:MongoStore = MongoStore.create({
    // mongoUrl: 'mongodb://localhost:27017/squ3',
    mongoUrl: process.env.MONGO,
    collectionName: 'sessions'
})

// EXPRESS MIDDLEWARE

app.use(cors())
app.use(express.json())


//app.use(express.urlencoded({extended:true})) //destroys everything??

const sessionMiddleware = session({
    secret: process.env.SECRET2 as string,
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

    if(req.session.userId){

        // console.log(playersDb)
        // console.log(lastMap)

        if(typeof playersDb[req.session.userId] == 'undefined'){
            playersDb[req.session.userId] = [-1, 480, 480]
            lastMap[req.session.userId] = 1
        }

        res.json({map: lastMap[req.session.userId] })
        return
    }
    res.json({message: "error" })
    
})

let authphrase = process.env.AUTH_PHRASE as string
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

app.post('/mint', async (req:Request, res:Response) => {

    const name:string = req.body.name
    const base64img:string = req.body.base64 
    const creator:string = req.body.creator
    const base64ImgLength = (base64img.length * (3/4)) - 2 
    const sourcePath = "./temp/temp-img.png"
    const timestamp = Date.now().toString()


    const imgOptions:PinataPinOptions = {
        pinataMetadata: {
            name:name
        },
        pinataOptions: {
            cidVersion: 0
        }
    }
    
    const jsonOptions:PinataPinOptions = {
        pinataMetadata: {
            name:name + "Metadata"
        },
        pinataOptions: {
            cidVersion: 0
        }
    }

    const body = {
        name: name,
        creator: creator,
        timestamp: timestamp,
        imgCid: ""
    }

    // console.log(base64img, name)

    if(base64ImgLength < 20000){
        const preparedBase64 = base64img.replace(/^data:image\/png;base64,/, "");
        await fs.writeFile(sourcePath, preparedBase64, 'base64', (info) => {

            pinata.pinFromFS(sourcePath, imgOptions).then((result:PinataPinResponse) => {
                const imgCid:string = result.IpfsHash
                body.imgCid = imgCid

                pinata.pinJSONToIPFS(body, jsonOptions).then((result:PinataPinResponse) => {
                    console.log('Image and metadata placed!')
                    res.json({response: result.IpfsHash})
                }).catch((err) => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })
        
        })

        

        

    }

    console.log('saved')
    // console.log(req.body)
})

app.get('/contractdata', async (req:Request, res:Response) => {

    const rawId:string = req.query.id as string
    const id = rawId.toLocaleLowerCase()
    const indx = 0


    const data = await getNftURI(id, indx)

    res.json({cid: data})

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
    const id:number = Number(req.query.id)
    if(isNaN(id)) return
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

    const playerId:string = socket.request.session.userId

    console.log("player " + playerId +" connected!")

    if(typeof playersDb[playerId] !== 'undefined'){

    
  
    const mapToSpawn = lastMap[playerId]

    playersDb[playerId][0] = mapToSpawn

    connectedPlayers[playerId] = true

    io.emit("changeMap", {from: -1, to: mapToSpawn, who: playerId})

    console.log(playersDb)

    socket.on("changeMap", data => {
        console.log(data)
        
        if(data.who === playerId){
            playersDb[data.who][0] = data.to

            if(data.to !== -1) lastMap[data.who] = data.to

            sendMapListener(data.to)


        }

        

        io.emit("changeMap", data)
        
    })

    socket.on("disconnect", reason => {
        // console.log(connectedPlayers)
        io.emit("changeMap", {from: playersDb[playerId][0], to: -1, who: playerId})

        playersDb[playerId][0] = -1
        console.log("player " + playerId +" disconnected!")
        clearInterval(updatePositionInDBInterval)
        connectedPlayers[playerId] = false
        delete connectedPlayers[playerId]
    })


    sendMapListener(playersDb[playerId][0])
    msgBroadcast(playersDb[playerId][0])


    function msgBroadcast(_mapId:number){
        socket.on("chat", (msg:Message) => {
            if(msg.content.length < 125 && msg.content.length > 0){
                io.emit("chat", msg)
            }
        })
    }

    function sendMapListener(_mapId:number){
        socket.on("map" + _mapId+ "send", (data:InputFromPlayer) => {
            if(data.id == playerId){
                currentPlayerLocation.x = data.x
                currentPlayerLocation.y = data.y
                mapsCache[_mapId].push(data)
            } 
        })    
    }

    let currentPlayerLocation:PlayerCords = {x: -1, y: -1};
    
    function updatePositionInDB(){
        if(currentPlayerLocation.x != -1 || currentPlayerLocation.y != -1){ //??
            playersDb[playerId][1] = currentPlayerLocation.x
            playersDb[playerId][2] = currentPlayerLocation.y
        }
    }

    const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000)

    // server-side validation -> trzeba zrobić!! JOI LIBRARY

    }
})



server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})