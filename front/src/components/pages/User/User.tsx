import React,{useState} from 'react'
import './User.css'
interface Props  {}

const User:React.FC<Props> = () => {


  const [editMode,SetEditMode] = useState()

  return (
    <div className='screen user_page'>
        <div className='form form_padding'>
             <h1>user profile</h1>
             <div className='text_center'>
                <img src="/images/avatarImage.png" alt="" />
             </div>
             <h5>name: Eyal</h5>
             <h5>Email: eyal444555@gmail.com</h5>
             <h5>age:33</h5>
        </div>
    </div>
  )
}

export default User