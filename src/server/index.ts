import express, {Express, Request, Response} from 'express'

const app:Express = express()
const port:number = 3000

app.get('/', (req:Request, res:Response) => {
    res.send('Test')
})

app.listen(port, () => {
    console.log("Server is runinn at port " + port)
})