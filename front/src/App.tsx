import React from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import io from 'socket.io-client'
import Chat from './components/pages/Chat/chat';
import Login from './components/pages/Login/Login';
import Page404 from './components/pages/page404/page404';
const socket = io('http://localhost:5000') 



//
function App() {

  return (
    <BrowserRouter>
    <div className="App"> 
      <Routes>
          {/* <Route path='/' element={<Login/>}></Route> */}
          

          {/* <Route path='/' element={<Login/>}></Route> */}
          <Route path='/' element={<Login title='Login'/>}></Route>
          <Route path='/chat' element={<Chat socket ={socket}/>}></Route>
          <Route path='/signup' element={<Login title='Sign up' signup={"user"}/>}></Route>
          <Route path='/newroom' element={<Login title='New Room' signup={"room"}/>}></Route>
          <Route path='/*' element={<Page404 />}></Route>
      </Routes>
    </div>
    </BrowserRouter>

);
}

export default App;



// const JoinChatRoomHandler = () =>{

//   if(room === '' || name ===''){
//     SetShowError(true)
//     SetErrorMessage('Username and room must both have value')
//     return
//   }
//   socket.emit('join_room',{username:name,roomId:room})
//   SetShowChat(true)
// }
