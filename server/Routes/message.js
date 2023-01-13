
const express = require('express')
const { Auth } = require('../utils/middleware/auth')
const MessageController = require('../Controllers/message')


const router = express.Router()



router.post('/',Auth,MessageController.SaveMessage)

router.get('/',Auth,MessageController.GetRoomMessages)


module.exports = router