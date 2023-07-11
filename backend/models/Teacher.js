import mongoose from "mongoose"

const teacherSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    employer_number:{
        type:String,
        required:true,
        unique:true
    }
})

export default mongoose.model('Teacher', teacherSchema)