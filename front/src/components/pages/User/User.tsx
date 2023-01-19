import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import  Axios  from '../../../util/Axios/axios'
import { useDispatch,useSelector } from 'react-redux'
import {Token,UserData,saveUser} from '../../../util/store/reducers/user'

import './User.css'
interface Props  {}

const User:React.FC<Props> = () => {

// util varibals
  const navigate = useNavigate()
  const dispatch = useDispatch()

// useSelector
  const token = useSelector(Token) 
  const user = useSelector(UserData) 


// State
  const [editMode,SetEditMode] = useState(false)
  const [name,SetName] = useState('')
  const [email,SetEmail] = useState('')
  const [age,SetAge] = useState(0)
  const [requestMessage,SetRequestMessage] = useState({
        message:'',
        show:false
  })


 useEffect(() =>{

    if(!token){
        navigate('/')
    }


 },[])


const BackToMainScreenHandler = () =>{

    navigate('/chat')

}


const Cancel = () =>{

    SetName('')
    SetEmail('')
    SetAge(0)
    SetEditMode(false)
    SetRequestMessage(prev =>{
        return {...prev,show:false}
    })
}


const EditHandler = async() =>{


    try{
        await Axios.put('/user',{name,email,age},{ headers: { 'Authorization': `Bearer ${token}` } })
        dispatch(saveUser({name,email,age}))
    }
    catch(e){
        console.log(e);
        SetRequestMessage( prev =>{
            return {...prev,message:'failed edit user'}
        })
    }
    Cancel()
}

let edit;

 if(editMode){
    edit = (
        <div>
            <div>
            <label htmlFor="name">Name</label>
            <input className='input' type="text"  name='name' id='name' value={name} onChange={(e) =>{SetName(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input className='input' type="text" id='email' value={email} onChange={(e) =>{SetEmail(e.target.value)}} />
            </div>
            <div>
                <label  htmlFor="age">Age</label>
                <input className='input' type="number" id='age' value={age} onChange={(e) =>{SetAge(parseInt(e.target.value))}}/>
            </div>
            <div className='flex around'>
                <button className='btn  btn-primary' onClick={Cancel}>Cancel</button>
                <button className='btn  btn-primary' onClick={EditHandler}>Edit</button>
            </div>

        </div>
    )
 }else{
    edit = (
        <div>
        <i  className="fa-sharp fa-solid fa-arrow-left icon click" onClick={BackToMainScreenHandler}></i>
        <h1>user profile</h1>
             <div className='text_center'>
                <img src={`${user.image?user.image:'/images/avatarImage.png'}`} alt="" />
             </div>
             <h5>name: {user.name}</h5>
             <h5>email: {user.email}</h5>
             <h5>age: {user.age}</h5>
             <div className='text_center'>
                <button className='btn btn-primary' onClick={() =>{SetEditMode(true)}}>Edit Mode</button>
             </div>
        </div>
    )
 }



  return (
    <div className='screen user_page'>
        <div className='form form_padding'>
            
            
           {requestMessage.show? <div className='p-3 mb-2 bg-danger text-white'>
                  <p>
                    {requestMessage.message}
                  </p>
            </div>
            :''}

             {edit}
        </div>
    </div>
  )
}

export default User