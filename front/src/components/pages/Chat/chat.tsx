import Axios from '../../../util/Axios/axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Token, UserData,UserRooms,saveUserRooms } from '../../../util/store/reducers/user';
import { RoomMessages, RoomInfo, saveRooMessages, saveNewRoomMessage, saveRoomInfo, saveRoomUsers } from '../../../util/store/reducers/room';
import { Showmenu,PhoneScreen,changeScreenPhone } from '../../../util/store/reducers/feature'
import {RoomIF} from '../../../util/interface/interface'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './chat.css'
import Navbar from '../../UI/navbar/navbar';
import SideMenu from '../../UI/sideMenu/sideMenu';



type Props = {
  socket: any
}

interface Message {
  message: string
  name: string,
  time: string
}

const Chat: React.FC<Props> = ({ socket }) => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, SetMessage] = useState('')
  const [sendButton, SetSendButton] = useState(false)


  //  Use SELECTOR 
  const user = useSelector(UserData)
  const token = useSelector(Token)
  const userRooms = useSelector(UserRooms)


  const room = useSelector(RoomInfo)
  const Messages = useSelector(RoomMessages)
  const showMenu = useSelector(Showmenu)
  const phoneScreen = useSelector(PhoneScreen)


  useEffect(() => {

    socket.on('receive_message', (data: Message) => {
      dispatch(saveNewRoomMessage(data))
      // SetMessagesList((prev) => [...prev, data])
    })


    return () => socket.off('receive_message')

  }, [socket,dispatch])

  // https://api.cloudinary.com/v1_1/userImages/image/upload

  useEffect(() => {

    if (!token) {
      navigate('/')
    }

    const request = async () => {

      try {
        const { data } = await Axios.get('/room/rooms', { headers: { 'Authorization': `Bearer ${token}` } })

        dispatch(saveUserRooms(data))
      }
      catch (e) {
        console.log(e);
      }
    }
    request()
  }, [token,dispatch])


  // Functions

  const SendMessageHandler = async () => {

    SetSendButton(true)


    if (message === '') {
      SetSendButton(false)
      return
    }

    const minutes = new Date(Date.now()).getMinutes() <10? `0${new Date(Date.now()).getMinutes()}`:new Date(Date.now()).getMinutes()

    const messageData = {
      room: room._id,
      name: user.name,
      message: message,
      time: new Date(Date.now()).getHours() + ":" + minutes
    }

    try {


      await socket.emit('send_message', messageData, () => {
        SetSendButton(false)
      })
      await Axios.post('/message', messageData, { headers: { 'Authorization': `Bearer ${token}` } })
    }
    catch (e) {
      console.log(e);

    }
    dispatch(saveNewRoomMessage(messageData))
    SetMessage('')

  }



  const ChangeRoom = async (newRoom: any) => {




    socket.emit('join_room', { roomId: newRoom._id, oldRoom: room._id, username: user.name })
    dispatch(saveRoomInfo(newRoom))
    try {
      const { data } = await Axios.get(`/message?roomId=${newRoom._id}`, { headers: { 'Authorization': `Bearer ${token}` } })

      dispatch(saveRooMessages(data.messages))
      dispatch(saveRoomUsers(data.users))
      dispatch(changeScreenPhone('chat'))
    }
    catch (e) {

    }

  }

  const messageLengthHandler = (message: string, Length: number) => {

    const returnMessage = message.split(' ').map(P => {
      if (P.length > Length) {

        return P.substring(0, Length)


      } else {
        return P
      }
    }).join(' ')

    // if(singleMSetence){
    //   returnMessage + '...'
    // }

    return returnMessage

  }





  return (
    <div>



      <div className='chat  flex flex-column'>
        <Navbar ></Navbar>
        <div className='container flex flex_1'>
          <div className='row flex_1'>

           
              
            {showMenu ? <div className={`col-md-4 bg-dark ${phoneScreen === 'menu'?'':'responsive_hidden'} scroll border_right`}>
              
                  <SideMenu></SideMenu>


            </div>
              : ''
            }
           

            <div className={`col-md flex  ${phoneScreen === 'chat'?'':'responsive_hidden'} flex-column border_right`}>
              <div id='chat_content' className='flex_1'>
                <div>
                  {Messages.map((p, index) => {
                    return (
                      <div key={index} className={p.name === user.name ? 'flex message_container left' : 'flex message_container right'}>
                        <div className='message'>
                          <div>
                            <h5 >{p.name}</h5>
                            <h5>{p.time}</h5>
                          </div>
                          <p>
                            {messageLengthHandler(p.message, 50)}
                          </p>
                        </div>
                      </div>

                    )
                  })}
                </div>
              </div>

              <div className='flex around center lower_bar'>
                {/* <img src="/images/defaultuser.png" className='logo click pad' alt="" /> */}
                <div className='flex around center input'>
                  <input type="text" className='input' placeholder='type message' value={message} onChange={(e) => { SetMessage(e.target.value) }} />
                  <button  onClick={SendMessageHandler} disabled={sendButton}> <i className="fa-solid fa-paper-plane logo_cdn click"></i></button>
                </div>
                {/* <i className="fa-regular fa-face-smile logo_cdn click"></i> */}
              </div>

            </div>
            <div className={`col-md-4 bg-dark ${phoneScreen === 'users'?'':'responsive_hidden'} scroll`}>

              {userRooms.map((p: RoomIF,index: number) => {
                return (
                  <div key={index}>
                    <div className='chat_userbox' onClick={() => { ChangeRoom(p) }}>
                      <div>
                        <div className='flex  align-items-center justify-content-between'>
                          <p>date</p>
                          <h5>{p.name}</h5>
                        </div>
                        <p>{Messages.length > 0 ? messageLengthHandler(Messages[Messages.length - 1].message, 60) : ' '}</p>
                      </div>

                      <img src={p.imageUrl?p.imageUrl:"/images/happiness.png"} className="avatar" alt="" />
                    </div>
                    <hr />
                  </div>
                )

              })}



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat

// test@gmail.com
// test2@gmail.com




