const mongoose = require('mongoose')


const messageSchema = mongoose.Schema({

    message:{
        type:String,
        required:true,
        trim:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    time:{
        type:String
    },
    name:{
        type:String,
        required:true,
    },
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:false,
    // }
},{timestamps: true})

const messages = mongoose.model('messages',messageSchema)

module.exports = messages