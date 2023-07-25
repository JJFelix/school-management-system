import express from 'express'
import { getAllStudents, getStudent, updatedStudentDetails } from '../controllers/student-controllers.js';

const studentRouter = express.Router()

studentRouter.get('/', getAllStudents)
studentRouter.get('/:user_id', getStudent)

studentRouter.put('/update/:user_id', updatedStudentDetails)

export default studentRouter;