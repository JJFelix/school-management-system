import mongoose from 'mongoose'

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

userSchema.pre('remove', async function(next){
    await this.model('Student').deleteMany({ user: this._id })

    await this.model('Teacher').deleteMany({user:this._id})
    next()
})

export default mongoose.model('User', userSchema)