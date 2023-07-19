import express  from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRouter from "./routes/user-routes.js"
import studentRouter from "./routes/student-routes.js";
import teacherRouter from "./routes/teacher-routes.js";

dotenv.config()

const app = express()

// middleware
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/students', studentRouter)
app.use('/api/teachers', teacherRouter)


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.65ct9xk.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to mongodb.\nServer listening on http://localhost:${process.env.PORT}`)
        })
    ).catch((err)=> console.error(err)
)
