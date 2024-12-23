import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
// import multer from 'multer'

const app =express()

console.log("origin",process.env.CORS_ORIGIN)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


console.log("port in app.js",process.env.PORT)
app.use(express.json())
app.use(cookieParser())


import userRouter from "./routes/user.routes.js"
import imageRouter from "./routes/image.routes.js"

app.get('/',(req,res)=>{
    res.send("server is running")
})
app.use("/api/v1/users", userRouter)
app.use("/api/v1/images", imageRouter)

export  {app}