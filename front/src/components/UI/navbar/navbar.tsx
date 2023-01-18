import React from 'react'
import './navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { UserData } from '../../../util/store/reducers/user'
import { RoomInfo, RoomUsers } from '../../../util/store/reducers/room'
import { SidemenuChange, SidemenuType, Showmenu, PhoneScreen, changeScreenPhone } from '../../../util/store/reducers/feature'
import { saveToken,Token } from '../../../util/store/reducers/user'
import   Axios  from  '../../../util/Axios/axios'
import { useNavigate } from 'react-router'

type Props = {

}

const Navbar: React.FC<Props> = (props) => {

    const user = useSelector(UserData)
    const room = useSelector(RoomInfo)
    const roomUsers = useSelector(RoomUsers)
    const phoneScreen = useSelector(PhoneScreen)
    const token = useSelector(Token)

    const showmenu = useSelector(Showmenu)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // FUNCTIONS
    const SideMeunHandler = (type: string) => {
        dispatch(changeScreenPhone('menu'))
        dispatch(SidemenuChange(true))
        dispatch(SidemenuType(type))
    }
    
    const closeMenuHandelr = () => {
        dispatch(changeScreenPhone('chat'))
        dispatch(SidemenuChange(false))
    }
    const LogoutHandler = async() =>{
        try{
            await Axios.post('/logoutAll',{},{ headers: { 'Authorization': `Bearer ${token}`}})
            dispatch(saveToken(''))
            navigate('/')
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>

            <div id='navbar' className='bg-primary'>
                <div className='container'>
                    <div className='row'>


                        {showmenu ? <div className='col-md-4 flex border_right'>
                            <div className='flex navbar_icons'>
                                <i className="fa-solid fa-xmark logo_cdn click" onClick={closeMenuHandelr}></i>
                            </div>


                        </div>
                            : ''
                        }

                        <div className={`col-md   ${phoneScreen === 'chat' ? '' : 'responsive_hidden'} flex center between border_right navbar_icons`}>
                            <div className='container'>
                                <div className='row  '>

                                    <div className='col-md-6 col-sm-12 flex align-items-center'>

                                        <div>
                                            <i className="fa-solid fa-ellipsis-vertical logo_cdn click" onClick={() => { SideMeunHandler('detail') }}></i>
                                            <i className="fa-solid fa-magnifying-glass logo_cdn click" onClick={() => { SideMeunHandler('search') }}></i>
                                            <i className="fa-sharp fa-solid fa-people-group logo_cdn click" onClick={() => { dispatch(changeScreenPhone('users')) }} ></i>
                                        </div>

                                    </div>
                                    <div className='col-md-6 col-sm-12 '>



                                        <div className='flex justify-content-end align-items-center'>
                                            <div>
                                                <div className='flex justify-content-end'>
                                                    <h3>{room.name}</h3>

                                                </div>
                                                <div className={`flex justify-content-end flex-wrap`}>
                                                    {roomUsers.length > 0 ? roomUsers.map((p, index) => {
                                                            return <p key={index}>,{p.name}</p>       
                                                    }) 
                                                    : <p>group users</p>}
                                                </div>
                                            </div>
                                            <img src={room.imageUrl ? room.imageUrl : "images/defaultuser.png"} alt="" className='avatar' />

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>




                        <div className={`menu_space  ${phoneScreen === 'users' ? 'col-md' : 'responsive_hidden'} col-md-4 align-items-center flex navbar_icons between`}>


                            <div>
                                <i className="fa-sharp fa-solid fa-door-open  logo_cdn click" onClick={LogoutHandler}></i>
                                <i className="fa-brands fa-rocketchat logo_cdn click" onClick={() => navigate('/newroom')}></i>
                                <i className="fa-solid fa-user logo_cdn click"  id='user_profile' onClick={() =>{navigate('/user_profile')}}></i>
                            </div>

                            <div className='flex center'>
                                <h2>{user.name}</h2>
                                <img src={user.image ? user.image : "images/defaultuser.png"} alt="" className='avatar' />
                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
export default Navbar