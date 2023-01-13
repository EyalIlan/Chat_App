import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from '../../../util/Axios/axios';
import { useDispatch, useSelector } from 'react-redux'
import { saveUser, saveToken,Token } from '../../../util/store/reducers/user'
import { showModal,ChangeModalShowing } from '../../../util/store/reducers/feature'
import { NewRoomUsers } from '../../../util/store/reducers/room'
import './Login.css'
import { UserIF } from '../../../util/interface/interface';
import Modal from '../../UI/modal/modal';
import {checkStringSize} from '../../../util/Functions/text'

type Props = {
  title: string
  signup?: string

}


const Login: React.FC<Props> = ({ title, signup }) => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ShowModal = useSelector(showModal)
  const newRoomUsers = useSelector(NewRoomUsers)
  const token = useSelector(Token)

  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [RePassword, SetRePassword] = useState('')
  const [age, SetAge] = useState(0)
  const [username, SetUserName] = useState('')


  const [roomtitle,SetRoomTitle] = useState('')
  const [users,SetUsers] = useState<UserIF []>([])


  const [userAvatar, SetUserAvatar] = useState<any>()
  const [PrevieAvatar, SetPreviewAvatar] = useState<string>()

  const [Error, SetError] = useState('')
  const [showError, SetShowError] = useState(false)



  const LoginHandler = async () => {

    try {
      const reqeust = await Axios.post('/login', { email, password })
      dispatch(saveUser(reqeust.data.user))
      dispatch(saveToken(reqeust.data.token))
      navigate('/chat')
    }
    catch (e: any) {
      console.log(e);

      SetError(e.message)

      SetShowError(true)
    }


  }
  //
  //
  useEffect(() => {

    if (userAvatar) {
      const reader = new FileReader();

      reader.onloadend = () => {
        SetPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(userAvatar)

    } else {
      SetPreviewAvatar(undefined)
    }

  }, [userAvatar])

  const SignUpUserHandler = async () => {
    if (password !== RePassword || password.length < 5) {
      SetShowError(true)
      SetError('password and RePassword need to be equal')
      return
    }

    try {

      await Axios.post('/user', { email, password, age, name: username, userImage: PrevieAvatar })
      navigate('/')
    }
    catch (e) {

      console.log(e);


      SetShowError(true)
      SetError('Error trying sign up')
    }

  }


  const imageUploadHandler = (e: any) => {

    const file = e.target.files[0]

    if (file && file.type.substr(0, 5) === "image") {
      SetUserAvatar(file)
    } else {
      SetUserAvatar(undefined)
    }

  }


  const openModalUsersHandler = async() =>{
    
    
    if(users.length === 0){
        try{
          const request = await Axios.get('/user/allusers')
          SetUsers(request.data)
        }
        catch(e){
          console.log(e);
        }
        
    }
    dispatch(ChangeModalShowing(true))
  }


    const CreateNewRoom = async() =>{

      let arr = []

     arr = newRoomUsers.map(p =>{
        return p._id
      })

      try{
        Axios.post('/room/',{name:roomtitle,userImage:PrevieAvatar,ingroup:arr},{ headers: { 'Authorization': `Bearer ${token}`}})
        navigate('/chat')
      }
      catch(e:any){
        SetError(e.message)
        SetShowError(true)
      }
    }

  let errorMessage = (
    <div className='p-3 mb-2 bg-danger text-white'>
      <p>
        {Error}
      </p>
    </div>
  )
    
  return (
    <div>
      <div className='screen flex justify-content-center align-items-center'>
       {ShowModal? <Modal users={users}></Modal>:''}
        <div className='form form_padding responsive justify-content-between '>

          {signup === "room" || signup === "user" ? <>
            <div className=' flex-column form_padding'>


              <div className='flex_1'>
                <img id='form_image' src={PrevieAvatar ? `${PrevieAvatar}` : "./images/avatarImage.png"} alt="" />
              </div>

              <div className='responsive  center justify-content-center'>
                <label htmlFor="Userfile" className='btn btn-dark btn-lg flex_1'>Choose user avatar</label>
                <input type="file" name="file" id='Userfile' accept='image/*' className='form_input ' onChange={(e) => { imageUploadHandler(e) }} />
              </div>
            </div>
          </> : ''
          }
          <div className='responsive flex-column justify-content-around flex_1'>
            <h1 className='mainTitle'>{title}</h1>


            {
              signup === "room" ?
                <div className='flex_1   scroll'>
                  <div className='flex justify-content-between'>
                    <label htmlFor="newRoom"><h4>Room Title </h4></label>
                    <button className='btn btn-primary' onClick={openModalUsersHandler}>add users</button>
                  </div >
                  <div className='flex'>
                    <input type="text" name="newRoom" id='newRoom' className='flex_1 form_input' placeholder='Room Title' onChange={(e) => { SetRoomTitle(e.target.value) }} />
                  </div>
                  
                  <div>
                      <div className='grid grid_3 mh_400 scroll'>
              
                              {
                                newRoomUsers.map((p,index) =>{
                                    return <div key={index} className="flex flex-column">
                                              <p>{checkStringSize(p.name,7)}</p>
                                              <img src={p.image} alt="user images" className='logo' />
                                          </div>
                                })
                              } 
                      </div>
                  </div>
                </div>
                : ''}

            <div>
              {showError ? errorMessage : ''}


              {
                signup === "user" ?
                  <>
                    <div>
                      <label htmlFor="username">Username</label>
                    </div>
                    <input type="text" name="username" id='username' className='form_input' placeholder='Username' onChange={(e) => { SetUserName(e.target.value) }} />
                  </>
                  : ''
              }
              {signup === "user" || signup === undefined ?
                <div className='spacing'>
                  <div>
                    <label htmlFor="email">Email</label>
                  </div>
                  <input  type="text" name="email" id='email' className='form_input medium_text' placeholder='email' onChange={(e) => { SetEmail(e.target.value) }} />
                  <div>
                    <label htmlFor="password">Password</label>
                  </div>
                  <input type="text" name="password" id='password' className='form_input' placeholder='password' onChange={(e) => { SetPassword(e.target.value) }} />
                </div>
                : ''
              }


              {
                signup === "user" ?
                  <div>
                    <div>
                      <label htmlFor="password">RePassword</label>
                    </div>
                    <input type="text" name="password" id='password' className='form_input' placeholder='RePassword' onChange={(e) => { SetRePassword(e.target.value) }} />
                    <div>
                      <label htmlFor="age">Age</label>
                    </div>
                    <input type="number" name="age" id='age' className='form_input' placeholder='Age' onChange={(e) => { SetAge(parseInt(e.target.value)) }} />
                  </div>
                  :
                  ''
              }
                {signup === "user" || signup === undefined ?
                  <div className='spacing flex between'>
                    <button className='btn btn-primary' onClick={signup ? () => { navigate('/') } : LoginHandler}>{signup ? "Login page" : "Login"}</button>
                    <button className='btn btn-primary' onClick={signup ? SignUpUserHandler : () => { navigate('/signup') }}>{signup ? "Sign up" : "Sign up page"}</button>
                  </div>
                  : ''}
                {signup === "room" ?
                  <div className='spacing flex between'>
                    <button className='btn btn-primary' onClick={CreateNewRoom}>create new room</button>
                    <button className='btn btn-primary' onClick={() => { navigate('/chat') }}>Cancel</button>
                  </div>
                  : ''}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login