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
    console.log("Connected!!!")
})

server.listen(port, () => {
    console.log("Server is runinn at port " + port)
})