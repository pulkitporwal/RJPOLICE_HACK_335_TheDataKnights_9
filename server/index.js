import express from "express";
import connectToDB from "./config/connectToDB.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectToDB().then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`⚙️ Server is listen up on http://localhost:${process.env.PORT || 5000}`)
    })
    app.on('error',()=>{
        console.log(`App can't able to connect with the Database`)
    })
}).catch((err)=>{
    console.log(`ERR: ${err}`)
})