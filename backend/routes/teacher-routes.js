import express from 'express'
import { getAllTeachers, getTeacher, updatedTeacherDetails } from '../controllers/teacher-controllers.js'

const teacherRouter = express.Router()

teacherRouter.get('/', getAllTeachers)
teacherRouter.get('/:user_id', getTeacher)

teacherRouter.put('/update/:user_id/', updatedTeacherDetails)

export default teacherRouter