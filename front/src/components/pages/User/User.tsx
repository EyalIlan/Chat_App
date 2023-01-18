import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import  Axios  from '../../../util/Axios/axios'
import { useDispatch,useSelector } from 'react-redux'
import {Token,UserData} from '../../../util/store/reducers/user'

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
  const [requestMessage,SetRequestMessage] = useState('')


 useEffect(() =>{

    if(!token){
        // navigate('/')
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
}


const EditHandler = async() =>{


    try{
        const {data} = await Axios.post('/edit',{name,email,age},{ headers: { 'Authorization': `Bearer ${token}` } })
        SetRequestMessage(data)
    }
    catch(e){
        console.log(e);
        SetRequestMessage('proplem edit user')
    }
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
             <h5>name:{user.name}</h5>
             <h5>email:{user.email}</h5>
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
             {edit}
        </div>
    </div>
  )
}

export default User