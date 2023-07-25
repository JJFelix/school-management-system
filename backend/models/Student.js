import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    admission_number:{
        type:String,
        required:true,
        unique:true
    }
})

studentSchema.pre('remove', async function(next){
    await this.model('Student').deleteMany({user:this.user})
    next()
})

export default mongoose.model('Student', studentSchema)