const Mongoose = require('mongoose')




const mongoConnect = () =>{

    Mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
    .then( ()=>{
        console.log('Database Connected');
    })
    .catch(e =>{
        console.log('Cant connect to database');
        console.log(e);
    })
} 
////
module.exports ={
    mongoConnect
}
//