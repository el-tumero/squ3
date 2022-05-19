import express, {Express, Request, Response} from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

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

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
})

app.get('/player', (req:Request, res:Response) => {
    const id:number = Number(req.query.id)
    res.json({"map": playersDb[id][0]})
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


    // NOTE!
    // nie petla tylko najpierw sprawdzane jest gdzie user jest aby bardziej zoptymalizowac
    // for (let i = 1; i < NUMBER_OF_MAPS + 1; i++) {
    //     socket.on("map" + i + "send", (data:InputFromPlayer) => {
    //         mapsCache[i].push(data)
    //     })
    // }


    sendMapListener(playersDb[playerIdNum][0])


    function sendMapListener(_mapId:number){
        socket.on("map" + _mapId+ "send", (data:InputFromPlayer) => {
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
        console.log(playersDb[playerIdNum])
        }
    }

    const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000)


    
    

    // socket.on("map" + playersDb[playerIdNum][0] + "send", (data:InputFromPlayer) => {
    //         mapsCache[playersDb[playerIdNum][0]].push(data)
            // counter++;
            // if(counter === 5){
            //     playersDb[playerIdNum][1] = data.x
            //     playersDb[playerIdNum][2] = data.y
            //     console.log(playersDb[playerIdNum])
            //     counter = 0
            // }

            
    // })


 

    // server-side validation -> trzeba zrobić!! JOI LIBRARY

})



server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})