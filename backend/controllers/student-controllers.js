import { validationResult } from 'express-validator'

import Student from '../models/Student.js'

export const getAllStudents = async (req, res, next)=>{
    try {
        const students = await Student.find().populate('user', 'name email role')

        if(!students){
            console.error("No students found")
            return res.status(404).json({ message: "No students found" })
        }
        console.log("Students retrieved successfully");
        return res.status(200).json({ students })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message:"Unexpected error happened" })
    }
}

export const updatedStudentDetails = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { user_id } = req.params
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { user:user_id },
            { $set:req.body },
            { new:true }
        )

        if(!updatedStudent){
            console.error("Student not found")
            return res.status(404).json({ message: "Student not found" })
        }

        console.log("Student updated successfully", updatedStudent)
        return res.status(200).json({ updatedStudent })
    } catch (err) {
        console.error(err)        
        res.status(500).json("Unexpected error occurred")   
    }
}