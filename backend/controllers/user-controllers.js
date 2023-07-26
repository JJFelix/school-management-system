import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

import User from '../models/User.js'
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'

export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find()
        if(!users){
            console.error("No users found")
            return res.status(404).json({ message: "No users found" })
        }
        console.log("Users retrieved successfully");
        return res.status(200).json({ users })
    }catch (err){
        console.err(err)
        return res.status(500).json({message:"Unexpected error occurred"})
    }
}

export const getUser = async (req, res, next)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id)            
        if(!user){
            console.error("User not found")
            return res.status(404).json({ message: "User not found"})
        }
        return res.status(200).json({user})
    } catch (err) {
        console.error(err)
        return res.status(500).json({message:"Unexpected error occurred."})  
    }
}

export const register = async (req,res,next)=>{
    const { name, email, password, phone_number, address, 
        role, admission_number, employer_number } = req.body
    if(!name || name.trim()==="" ||!email || email.trim()==="" ||
        !password || password.trim()==="" || !phone_number || phone_number===undefined ||
        !address || address.trim()==="" || !role || role.trim()==="" 
    ){
        console.error("Invalid inputs")
        return res.status(422).json({message:"Invalid inputs"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const user = new User({ name, email, password:hashedPassword,phone_number, address, role })      
        if (admission_number){
            const student = new Student({ 
                user:user, admission_number 
            })
            await student.save()
        }    

        if (employer_number){
            const teacher = new Teacher({
                user:user, employer_number
            })
            await teacher.save()
        }        
        await user.save()        
        console.log('User created successfully:', user)
        return res.status(200).json({user})
    } catch (err) {
        console.error(err) 
        return res.status(500).json({message:"Unexpected error occurred"})
    }
}

export const login = async (req,res,next)=>{
    const {email, password}  = req.body
    if(
        !email || email.trim()==="" || !password || password.trim()===""
    ){
        console.error("Invalid details")
        return res.status(422).json({message:"Invalid inputs"})
    }
    try{
        const existingUser = await User.findOne({ email })     
        if(!existingUser){
            console.error("User not found")
            return res.status(404).json({message:"User not found"})
        }  
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect){
            console.error("Incorrect password")
            return res.status(404).json({message:"Incorrect password"})
        }
        console.log("Successfully logged in")
        return res.status(200).json({message:"Successfully logged in",id:existingUser._id})
    }catch(err){
        console.error(err)
        return res.status(500).json({message: "Unexpected error occurred"})
    }
}

export const updateLoginCredentials = async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })
    }

    const {user_id} = req.params
    const {email, password} = req.body  

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            user_id,
            { email:email, password:hashedPassword},
            { new: true }
        )
        if(!updatedUserDetails){
            console.error("User not found")
            return res.status(404).json({message:"User not found"})
        }
        console.log("Successfully updated user login details")
        return res.status(200).json({message: "User login details updated successfully"})
    } catch (err) {
        console.error(err)        
        return res.status(500).json({err})
    }
}

export const updateUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {user_id} = req.params
    
    try {     
        const updatedUser = await User.findByIdAndUpdate(
            user_id, 
            { $set:req.body },
            { new:true }
        )

        if(!updateUser){
            console.error("User not found")
            return res.status(404).json({ message: "User not found" })
        }

        if (req.body.employer_number){
            const updatedTeacher = await Teacher.findOneAndUpdate(
                { user: user_id },
                { $set:req.body },
                { new:true }
            ).populate("user", "name email role")
    
            if(!updatedTeacher){
                console.error("Teacher not found")
                return res.status(404).json({ message: "Teacher not found" })
            }
            console.log("Teacher updated successfully", updatedTeacher)
            return res.status(200).json({ updatedTeacher })
        }

        if (req.body.admission_number){
            const updatedStudent = await Student.findOneAndUpdate(
                { user:user_id },
                { $set:req.body },
                { new:true }
            ).populate("user", "name email role")

            if(!updatedStudent){
                console.error("Student not found")
                return res.status(404).json({ message: "Student not found" })
            }

            console.log("Student updated successfully", updatedStudent)
            return res.status(200).json({ updatedStudent })
        }

        console.log("User updated successfully")
        return res.status(200).json({ updatedUser })

    } catch (err) {
        console.error(err)        
        res.status(500).json("Unexpected error occurred")
    }
}

export const deleteUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {user_id} = req.params

    try {
        const student = await Student.findOneAndRemove({ user:user_id })
        const teacher = await Teacher.findOneAndRemove({ user:user_id })
        const user = await User.findByIdAndRemove(user_id) 

        if (!student){
            console.log("Student not found");
            // return res.status(404).json({ message: "Student not found" })
        }else{
            console.log("Student deleted")
        }
        

        if(!teacher){
            console.log("Teacher not found");
            // return res.status(404).json({ message: "Teacher not found" })
        }else{
            console.log("Teacher deleted")
        }        

        if(!user){
            console.log("User not found")
            return res.status(404).json({message:"User not found"})
        }
        console.log(`User ${user_id} deleted`)

        return res.status(200).json({ message:"Everything deleted", user })
    } catch (err) {        
        console.error(err)
        return res.status(500).json("Unexpected error occurred")
    }
}