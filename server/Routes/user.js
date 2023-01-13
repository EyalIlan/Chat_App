const express = require('express')
const { Auth } = require('../utils/middleware/auth')
const UserContoller = require('../Controllers/user')

const router = express.Router()


router.get('/allusers',UserContoller.GetAllUsers)

router.get('/',Auth,UserContoller.GetUser)

router.post('/',UserContoller.SaveNewUser)

router.put('/',Auth,UserContoller.UpdateUser)

router.delete('/',Auth,UserContoller.DeleteUser)


module.exports = router