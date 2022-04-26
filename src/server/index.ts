import express, {Express, Request, Response} from 'express'
import path from 'path'

const app:Express = express()
const port:number = 3000

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
})

app.use('/assets', express.static(path.join(process.cwd(), 'assets')))

app.listen(port, () => {
    console.log("Server is runinn at port " + port)
})