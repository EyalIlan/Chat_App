
const {Server} = require('socket.io')

const CreateServer = (server) =>{
    
    const io = new Server(server,{
        cors:{
            origin:'http://localhost:3000',
            methods:["GET","POST"]
        }
    })
    return io

}



const  SocketEvents = (io) =>{

    io.on('connection',(socket) =>{

        console.log(`User ${socket.id} connected`);
    
    
        socket.on('join_room',({roomId,oldRoom,username}) =>{
            // Leave old room
            socket.leave(oldRoom)
            
            // join new room
            socket.join(roomId)
            console.log(`User ${username} has join room ${roomId}`);
        })
    
        
        socket.on('send_message',(data,cb) =>{
            socket.to(data.room).emit('receive_message',data,()=>{
                // console.log('message to client went well',res);
                cb()
            })
        })
    
        socket.on('disconnect',() =>{
            console.log(`disconnect ${socket.id}`);
        })
    
    })


} 

module.exports = {
    SocketEvents,
    CreateServer
}

//