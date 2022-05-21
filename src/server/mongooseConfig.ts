import mongoose from "mongoose";

function connectToDb():mongoose.Connection{
    const dbString:string = 'mongodb://localhost:27017/squ3'
    const connection:mongoose.Connection =  mongoose.createConnection(dbString)
    console.log("Connected to DB!")
    return connection
}


export default connectToDb