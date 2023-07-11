import express  from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRouter from "./routes/user-routes.js";

dotenv.config()

const app = express()

// middleware
app.use(express.json())
app.use('/api/users',userRouter)


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.65ct9xk.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to mongodb.\nServer listening on http://localhost:${process.env.PORT}`)
        })
    ).catch((err)=> console.error(err)
)


// app.listen(5000, ()=>{
//     console.log('Server listening on port http://localhost:5000')
// })