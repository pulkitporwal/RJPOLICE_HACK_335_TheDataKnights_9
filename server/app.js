import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:'20kb'}));
app.use(cookieParser())
app.use(express.urlencoded({limit:'20kb',extended:true}))
app.use(express.static('public'))


import userRouter from './routers/user.router.js'
app.use("/api/v1/users",userRouter)

export {app};