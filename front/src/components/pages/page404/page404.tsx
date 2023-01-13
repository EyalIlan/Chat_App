
import React from 'react'
import './page404.css'
import {useNavigate} from 'react-router-dom'
type Props = {}

const Page404:React.FC<Props> = (props) => {
  
    const navigate = useNavigate()
    
    const  NavigateToLoginPageHandler = () =>{
        navigate('/')
    }

    return (
    <div id='page_404' >
        <button className='btn btn-primary btn-lg' onClick={NavigateToLoginPageHandler}>return to login page</button>
    </div>
  )
}

export default Page404