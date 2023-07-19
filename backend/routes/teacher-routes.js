import express from 'express'
import { getAllTeachers, updatedTeacherDetails } from '../controllers/teacher-controllers.js'

const teacherRouter = express.Router()

teacherRouter.get('/', getAllTeachers)

teacherRouter.put('/update/:user_id/', updatedTeacherDetails)

export default teacherRouter