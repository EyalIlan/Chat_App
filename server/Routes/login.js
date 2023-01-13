const express = require('express')
const LoginController = require('../Controllers/auth')
const { Auth } = require('../utils/middleware/auth')
const router = express.Router()



router.post('/login',LoginController.Login)

router.post('/logout',Auth,LoginController.Logout)

router.post('/logoutAll',Auth,LoginController.LogoutAll)




// router.post('/logout')


module.exports = router 
