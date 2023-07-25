import { validationResult } from 'express-validator'

import Teacher from "../models/Teacher.js";

export const getAllTeachers = async (req,res, next)=>{
    try {
        const teachers = await Teacher.find().populate('user', 'name email role')

        if(!teachers){
            console.error("No teachers found")
            return res.status(404).json({ message: "No teachers found" })
        } 
        console.log("Teachers retrieved successfully")
        return res.status(200).json({ teachers })
    } catch (err) {
        console.error(err)   
        return res.status(500).json({ message: "Unexpected error occurred" })     
    }
}

export const getTeacher = async (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {user_id} = req.params

    try{
        const teacher = await Teacher.findOne({ user: user_id}).populate('user', 'name email phone_number address role')

        if(!teacher){
            console.error("Teacher not found!");
            return res.status(404).json({message: `Teacher with id ${user_id} not found` })
        }

        // const associatedUserDetails = await User.find(teacher.user)
        // console.log(associatedUserDetails)
        
        console.log("Teacher retrieved successfully")
        return res.status(200).json({ teacher })
    }catch (err){
        console.error(err);
        return res.status(500).json({ message:"Unexpected error occurred" })
    }
}

export const updatedTeacherDetails = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { user_id } = req.params

    try {
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { user: user_id },
            { $set:req.body },
            { new:true }
        )

        if(!updatedTeacher){
            console.error("Teacher not found")
            return res.status(404).json({ message: "Teacher not found" })
        }
        console.log("Teacher updated successfully", updatedTeacher)
        return res.status(200).json({ updatedTeacher })        
    } catch (err) {
        console.error(err)        
        res.status(500).json("Unexpected error occurred")        
    }
}