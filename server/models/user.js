const mongoose = require('mongoose')
const Validator = require('validator')
const Bycrpt = require('bcrypt')

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length< 3){
                throw new Error('Name must be longer then 3 charcters')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }

        }
    },
    age:{
        type:Number,
        required:false,
        default:-1,
        validate(age){
            if(age < 0){
                throw new Error('Age must be positive number')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    image:{
        type:String
    }


},{timestamps:true})


userSchema.methods.getProfile = function(){

    const user = this
    const userObject = user.toObject()
    delete userObject.password 
    delete userObject.tokens 
    delete userObject.avatar 

    return userObject
}


userSchema.virtual('rooms',{
    ref:'room',
    localField:'_id',
    foreignField:'owner'
})

userSchema.pre('save',async function(next){

    const user = this
    if(user.isModified('password')){
        user.password = await Bycrpt.hash(user.password,8)
    }
    next()
})


const user =  mongoose.model('users',userSchema)


module.exports = user