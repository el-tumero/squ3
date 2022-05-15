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

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});



const playersDb:Database = {
    0: [1, 480, 480],
    1: [1, 432, 336]
}



// console.log(Object.entries(playersDb))
// function getKeyByValue(object:any, value:any) {
//     return Object.keys(object).find(key => object[key][0] === value);
//   }

app.use(cors())

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
})

app.get('/mapdata', (req:Request, res:Response) => {
    const id = req.query.id
    const playerDbFormated = Object.entries(playersDb)

    const result = playerDbFormated.filter(entry => entry[1][0] == id)
    
    const json = Object.fromEntries(result)
    res.json(json)

})

app.use('/assets', express.static(path.join(process.cwd(), 'assets')))

io.on("connection", socket => {
    console.log("Connected!")

    socket.on("changeMap", data => {
        playersDb[data.who][0] = data.to
        io.emit("changeMap", data)
    })

    socket.on("map1send", data => {
        io.emit("map1recv", data)
    })

    socket.on("map2send", data => {
        io.emit("map2recv", data)
    })

    

})



server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})