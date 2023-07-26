import mongoose from 'mongoose'
import Student from './Student.js'
import Teacher from './Teacher.js'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin', 'student','teacher'],
        required:true
    },
})

// userSchema.pre('remove', async function(next){
//     const user = this
//     await Student.deleteOne({ user: user._id })

//     await Teacher.deleteOne({ user:user._id })
//     next()
// })

// userSchema.pre('remove', async function(next){
//     const doc = await this.model.findOne(this.getQuery())
//     if(doc){
//         const userId = doc._id
//         try {
//             await this.model('Student').deleteOne({ user:userId })
//             await this.model('Teacher').deleteOne({ user:userId })
//             console.log(`Deleted related Student/Teacher documents for User:${userId}`);
//         } catch (err) {
//             console.error(`Error deleting related documents: ${err.message}`);        
//             next(err)
//         }
//     }
// })

export default mongoose.model('User', userSchema)