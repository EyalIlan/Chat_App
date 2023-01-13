import React, { useState } from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { sideMenuType } from '../../../util/store/reducers/feature'
import { RoomMessages,RoomUsers,RoomInfo,saveRoomUsers } from '../../../util/store/reducers/room'
import { showModal,ChangeModalShowing } from '../../../util/store/reducers/feature'
import { Token } from '../../../util/store/reducers/user'
import { MessageIF } from '../../../util/interface/interface'
import  Axios  from '../../../util/Axios/axios'
import Modal from '../modal/modal'

import './sideMenu.css'

interface Props {
    MenuType?: string
}

const SideMenu: React.FC<Props> = ({ MenuType }) => {


    const [searchTerm, SetSearchTerm] = useState('')
    const [filterMessages, SetFilterMessages] = useState<MessageIF[]>([])


    const dispatch = useDispatch()

    const menuType = useSelector(sideMenuType)
    const messages = useSelector(RoomMessages)
    const users = useSelector(RoomUsers)
    const room = useSelector(RoomInfo)
    const ShowModal = useSelector(showModal)
    const token = useSelector(Token)

    const searchHandler = (term: string) => {

        SetSearchTerm(term)


        console.log(room);
        

        if(term !== ''){
            
                    let FilterMessage = messages.filter(p => {
                        return p.message.search(term) !== -1 && term.length >=2
                    })
                    SetFilterMessages(FilterMessage)
        }

    }
    
    const getAllGroupUsersHandler = async () =>{
        
        await Axios.get(`/room/allusers/${room._id}`, { headers: { 'Authorization': `Bearer ${token}`}})
        
        // dispatch(saveRoomUsers(request.data.users))
        
        dispatch(ChangeModalShowing(true))
    }

    const ExitGroupHandler = () =>{

    }


    let menu;

    if (menuType === 'search') {
        menu = (
            <div >

                <div className='message flex center'>
                    <input type="text" className='input' value={searchTerm} placeholder='search' onChange={(e) => { searchHandler(e.target.value) }} />
                </div>
                <div>

                    {filterMessages.map((p: MessageIF, index: number) => {
                        return (
                            <div key={index}>
                                <div className='chat_userbox' >
                                    <div>
                                        <div >
                                            <p>date</p>
                                        </div>
                                        <p>{p.message}</p>
                                    </div>

                                </div>
                                <hr />
                            </div>
                        )

                    })}

                </div>

            </div>
        )
    } else if (menuType === 'detail') {
        menu = (
        <div>

        <div className='box'>
            <div className='flex flex-column justify-content-center align-items-center'>
            <img className='box_avatar_image'  src={room.imageUrl?room.imageUrl:"/images/avatarImage.png"} alt="" />
            <h2>{room.name} </h2>
            <span className='medium_text'><p> קבוצה- גודל משתתפים</p></span>
            </div>
            {/* <hr className='bg-white box_line'/> */}
        </div>

        <div className='box scroll'>


        <div className='chat_userbox'>
                          <div>
                            <div >
                              <h5>Add users</h5>
                            </div>
                            
                          </div>
                          <img src="/images/happiness.png" className="avatar"  alt="image" />
                        </div>
                        <hr />

                {users.map((p,index) =>{
                    return (
                        <div key={index}>
                        <div className='chat_userbox'>
                          <div>
                            <div >
                              <h5>{p.name}</h5>
                            </div>
                            <p>message</p>
                          </div>
                          <img src={p.image?p.image:"/images/happiness.png"} className="avatar"  alt="image" />
                        </div>
                        <hr />
                      </div>
                    ) 
                })}
        </div>

        <div className='box flex justify-content-center'>
            <button className='btn btn-primary' onClick={getAllGroupUsersHandler}>show all users</button>
            <button className='btn btn-danger' onClick={ExitGroupHandler}>Quit from group</button>

        </div>
        </div>  
        )
    }


    return (
        <div className='menu_max_height'>
           {ShowModal?<Modal users={users}></Modal>:''}

            {menu}
        </div>
    )
}




export default SideMenu