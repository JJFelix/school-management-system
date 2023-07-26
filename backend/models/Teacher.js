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

// teacherSchema.pre('remove', async function(next){
//     await this.model('Teacher').deleteMany({user:this.user})
//     next()
// })

export default mongoose.model('Teacher', teacherSchema)