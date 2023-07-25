import { validationResult } from 'express-validator'

import Student from '../models/Student.js'
import User from '../models/User.js'

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

export const getStudent = async (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {user_id} = req.params

    try{
        const student = await Student.findOne({ user: user_id}).populate('user', 'name email phone_number address role')

        if(!student){
            console.error("Student not found!");
            return res.status(404).json({message: `Student with id ${user_id} not found` })
        }

        // const associatedUserDetails = await User.find(student.user)
        // console.log(associatedUserDetails)
        
        console.log("Student retrieved successfully")
        return res.status(200).json({ student })
    }catch (err){
        console.error(err);
        return res.status(500).json({ message:"Unexpected error occurred" })
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