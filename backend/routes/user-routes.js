import express from 'express'
import { register, getUser, getUsers, login, getStudents, updateUser } from '../controllers/user-controllers.js';

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.get('/students', getStudents)
userRouter.get('/teachers', )

userRouter.post('/register/', register)
userRouter.post('/login/', login)

userRouter.put('/update/:user_id/:role_id', updateUser)

export default userRouter;