import express, {Express, Request, Response} from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

const app:Express = express()
const port:number = 3000
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
})

app.use('/assets', express.static(path.join(process.cwd(), 'assets')))

io.on("connection", socket => {
    console.log("Connected!")

    // socket.on("move", data => {
    //     socket.broadcast.emit("moveOther", data)
    // })

    socket.on("position", data => {
        //console.log(data)
        // console.log(data)
        io.emit("moveOther", data)
    })


})



server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})