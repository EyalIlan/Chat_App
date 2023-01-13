
const express = require('express')
const RoomController = require('../Controllers/room')
const { upload } = require('../utils/common/multer')
const { Auth } = require('../utils/middleware/auth')
const router = express.Router()


router.put('/',Auth,RoomController.UpdateRoom)

router.post('/',Auth,RoomController.CreateRoom)

router.delete('/',Auth,RoomController.DeleteRoom)

router.get('/',Auth,RoomController.GetUserRooms)

router.get('/rooms',Auth,RoomController.GetAllRooms)

// router.post('/avatar/:name',Auth,upload.single('avatar'),RoomController.SaveRoomAvatarPicture)

// router.get('/avatar/:name',Auth,RoomController.GetRoomAvatarPicture)

router.get('/allusers/:id',Auth,RoomController.GetAllRoomUsers)

module.exports = router