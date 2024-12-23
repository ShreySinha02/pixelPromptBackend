import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
console.log("my port in index.js",process.env.PORT)

import connectDb from "./config/db.js";
import { app } from './app.js';



connectDb().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !",err)
})