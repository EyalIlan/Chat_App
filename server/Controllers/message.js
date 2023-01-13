const Message = require('../models/message')
const Room = require('../models/room')
//
//TODO deside where to get
const GetRoomMessages = async (req, res) => {

    try {
        // const roomMessages = await Message.find({ room: req.body.room })
        const data = await Room.findById(req.query.roomId)
        .populate({
            path:'users',
            options:{
                limit:10,
                strictPopulate: false
            }
        }).populate({
            path:'messages',
            options:{
                strictPopulate: false
            }
        })

        res.status(200).json({messages:data.messages,users:data.users})

    }
    catch (e) {
        console.log(e);
        res.status(500).json('Unable to get messages')
    }
}

const GetSpecificMessage = async (req, res) => {



}

const SaveMessage = async (req, res) => {

    const { message, room,name,time } = req.body

    try {
        const NewMessage = new Message(
            {
                message,
                room:room,
                name,
                time,
                owner: req.user._id
            })

        await NewMessage.save()
        res.status(201).json('Message saved')
    }
    catch (e) {
        res.status(500).json('Unable to save message')
    }
}

const UpdateMessage = async (req, res) => {

    try {

        const message = await Message.findByIdAndUpdate(req.query.messageId, { message: req.body.message })

    }
    catch(e){
        res.status(500).json('message updated')
    }

}

const DeleteMessages = async (req, res) => {


    try {
        const message = Message.findByIdAndDelete(req.query.messageId)
        res.status(200).json('Message deleted')

    }
    catch (e) {
        res.status(500).json('Problem deleting message')
    }
}

module.exports = {
    GetRoomMessages,
    GetSpecificMessage,
    SaveMessage,
    UpdateMessage,
    DeleteMessages
}