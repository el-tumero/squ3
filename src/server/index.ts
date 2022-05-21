import express, {Express, Request, Response} from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { SHA256 } from 'crypto-js'
import Web3 from 'web3'


const web3:Web3 = new Web3(Web3.givenProvider)
web3.setProvider(new Web3.providers.HttpProvider('https://bscrpc.com'));


const app:Express = express()
const port:number = 3000
const server = http.createServer(app)

interface Database{
    [playerId: number]: Array<number>
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


// for hardcoded cords
const playersDb:Database = {
    0: [1, 480, 480],
    1: [1, 432, 336]
}

Object.values(playersDb).forEach(playerData => {
    playerData[1] = playerData[1] / 1.5
    playerData[2] = playerData[2] / 1.5
})

const connectedPlayers:ActivePlayers = {} // i need to do connected players per map ;)

const NUMBER_OF_MAPS = 3



// console.log(Object.entries(playersDb))
// function getKeyByValue(object:any, value:any) {
//     return Object.keys(object).find(key => object[key][0] === value);
//   }



app.use(cors())
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
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

app.post('/auth', async (req:Request, res:Response) => {

    const singature:string = await req.body.signature
    const publicKey:string = await req.body.public_key

    const issuerPublicKey = await web3.eth.accounts.recover(hashedPhrase, singature)

    if(issuerPublicKey.toLocaleLowerCase() === publicKey ){
        // set session token or something like that?
        res.json({"token": "valid"})
        return
    }

    res.json({"token": "err"})
})



app.get('/mapdata', (req:Request, res:Response) => {
    const id = req.query.id
    const playerDbFormated = Object.entries(playersDb)

    const result = playerDbFormated.filter(entry => entry[1][0] == id)
    
    const json = Object.fromEntries(result)
    res.json(json)

})

app.use('/assets', express.static(path.join(process.cwd(), 'assets')))


const mapsCache:Array<Array<InputFromPlayer>> = [[], [], [], [], []]



// console.log(mapsCache[1])

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