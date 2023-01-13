import React from 'react'
import './modal.css'
import {useDispatch,useSelector} from 'react-redux'
import {ChangeModalShowing} from '../../../util/store/reducers/feature'
import {addUserToNewRoom,NewRoomUsers} from '../../../util/store/reducers/room'
import { UserIF } from '../../../util/interface/interface'

interface Props  {
    grid?:boolean,
    users?:UserIF[]
}
const Modal:React.FC<Props> = ({users}) => {
    

    const dispatch = useDispatch()
    const newRoomUserArray = useSelector(NewRoomUsers)


    const closeModalHandler = () =>{

       dispatch(ChangeModalShowing(false))
        
    }
    
    const addUserToCreateNewGroup = (user:UserIF) =>{
            
            let arr:UserIF [] = []
            newRoomUserArray.forEach(p =>{
                arr.push(p)
            })
            
           let findUser = arr.find(p => p._id === user._id)
            
            if(findUser){
              arr =  arr.filter(p =>{
                    return p._id !== user._id
                })
            }else{
                arr.push(user)
            }

            dispatch(addUserToNewRoom(arr))
    }

    return (
        <div className='Modal flex justify-content-center align-items-center'>
            
           <div id='modal' className='form scroll bg-black'>
             <div className=''>
                
                <div className='chat_userbox flex  align-items-center justify-content-end'>
                        <i className="fa-sharp fa-solid fa-xmark logo" onClick={closeModalHandler}></i>
                </div>
                {/* chat_userbox */}
            {users?users.map((p,index)=>{
                return <div key={index}>
                    <div className={`chat_userbox ${newRoomUserArray.find(j => j._id === p._id)?"bg-warning":''}`} onClick={() => addUserToCreateNewGroup(p)} >
                        <div>
                            <div className='flex  align-items-center justify-content-between'>
                            <p>date</p>
                            <h5>{p.name}</h5>
                            </div>
                            <p>hello world</p>
                       </div>
                     
                       <img src={p.image?p.image:"/images/happiness.png"} className="avatar"  alt="user Image" />
                    </div>
                     <hr />
                </div>
                }):''}
                    
              </div>
            </div>
        </div>
    )
}
 
export default Modal