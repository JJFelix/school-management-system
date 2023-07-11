import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    admission_number:{
        type:Number,
        required:true,
        unique:true
    }
})

export default mongoose.model('Student', studentSchema)