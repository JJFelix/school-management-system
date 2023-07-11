import express from 'express'
import { createAdminUser, helloUser, login } from '../controllers/user-controllers.js';

const userRouter = express.Router()

userRouter.get('/', helloUser)

userRouter.post('/register/admin/', createAdminUser)
userRouter.post('/login/', login)

export default userRouter;