import express from 'express'
import { 
        register, getUser, getUsers, login, 
        updateUser, updateLoginCredentials 
    } from '../controllers/user-controllers.js';

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id/', getUser)

userRouter.post('/register/', register)
userRouter.post('/login/', login)

userRouter.put('/updateCredentials/:user_id/', updateLoginCredentials)
userRouter.put('/update/:user_id/', updateUser)

export default userRouter;