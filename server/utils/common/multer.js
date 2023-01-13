
const Multer = require('multer')


const upload = Multer({
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        if(file.originalname.endsWith('.png') || file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg')){
            return cb(null,true)
         }
         cb(new Error('File must be a picture'))
    }
})


module.exports = {
    upload
}

