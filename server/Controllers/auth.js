const User = require('../models/user')
const Bycrpt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const Login = async(req,res) =>{

    const {password,email} = req.body
    try{
        const user =  await User.findOne({email})  
        
        if(!user){
           return res.status(400).json('Unable to connect')
        }
        
        const isMatch = await Bycrpt.compare(password,user.password)

        if(!isMatch){
           return res.status(400).json('Unable to connect')
        }
        
        const token = Jwt.sign({_id:user._id.toString()},process.env.TOKEN_PASSWORD,{expiresIn:'1d'})
        
        user.tokens = user.tokens.concat({token})

        await user.save()

        res.json({user:user.getProfile(),token})
    }
    catch(e){
        throw new Error(e)
    }

}

const Logout = async(req,res) =>{

    try{
        const user = req.user
        user.tokens = user.tokens.filter(p =>{
                return p.token !== user.token
        })
        await user.save()
        res.status(200).json('User Logout')
    }   
    catch(e){
        res.status(500).json('Unable to disconnect')
    }
}

const LogoutAll = async(req,res) =>{

    try{
        const user = req.user
        user.tokens = []
        await user.save()
        res.status(200).json('User logout from all accounts')
    }
    catch(e){
        res.status(500).json(`Cant logout from account`)
    }
}

module.exports = {
    Login,
    Logout,
    LogoutAll
}