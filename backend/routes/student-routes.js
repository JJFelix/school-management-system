import express from 'express'
import { getAllStudents, updatedStudentDetails } from '../controllers/student-controllers.js';

const studentRouter = express.Router()

studentRouter.get('/', getAllStudents)
studentRouter.get('/:id', )

studentRouter.put('/update/:user_id', updatedStudentDetails)

export default studentRouter;