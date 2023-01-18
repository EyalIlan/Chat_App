import {createSlice} from '@reduxjs/toolkit'
import {UserIF,RoomIF} from '../../interface/interface'
import {RootState} from '../store'
interface initalStateTyep{

    value:UserIF
    token:string | null
    userRooms:RoomIF[]
}

const initalState:initalStateTyep = {
    value:{
        _id:'',
        name:'',
        email:'',
        age:0,
        image:''
    },
    token: null,
    userRooms:[]
}

const userSlice = createSlice({
    name:'user',
    initialState:initalState,
    reducers:{
        saveUser:(state,action)=>{
            state.value = {...state.value,...action.payload}
        },
        saveToken:(state,action) =>{
            state.token = action.payload
        },
        saveUserRooms: (state,action) =>{
            state.userRooms = action.payload
        }
    }   
})


export const {saveUser,saveToken,saveUserRooms} = userSlice.actions

export const UserData = (state:RootState) => state.user.value
export const Token = (state:RootState) => state.user.token
export const UserRooms = (state:RootState) => state.user.userRooms

export default userSlice