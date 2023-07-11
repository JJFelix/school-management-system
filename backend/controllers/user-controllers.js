import bcrypt from 'bcrypt'

import User from '../models/User.js'
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'

export const helloUser = async (req,res,next)=>{
    res.status(200).json({message:'Hello friend'})
}

export const createAdminUser = async (req,res,next)=>{
    const {name, email, password, phone_number, address, role } = req.body

    if(
        !name || name.trim()==="" ||
        !email || email.trim()==="" ||
        !password || password.trim()==="" ||
        !phone_number || phone_number===undefined ||
        !address || address.trim()==="" ||
        !role || role.trim()===""
    ){
        console.error("Invalid inputs")
        return res.status(422).json({message:"Invalid inputs"})
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    // let user
    try {
        const user = new User({
            name, email, password:hashedPassword,phone_number, address, role 
        })
        await user.save()
        console.log('User created successfully:', user)
        return res.status(200).json({user})
    } catch (err) {
        console.error(err) 
        return res.status(500).json({message:"Unexpected error occurred"})
    }

    // if(!user){
    //     console.log('Unexpected error occurred')
    //     return res.status(500).json({message:'Unexpected error occurred'})
    // }

    // console.log('User:', user)
    // return res.status(201).json({user})
}

export const login = async (req,res,next)=>{
    const {email, password}  = req.body

    if(
        !email || email.trim()==="" ||
        !password || password.trim()===""
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
        
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

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