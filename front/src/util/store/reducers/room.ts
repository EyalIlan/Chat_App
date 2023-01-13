import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {MessageIF,UserIF} from '../../interface/interface'

interface initalStateTyep{

    roomInfo:{
        _id:string
        name:string,
        imageUrl:string,
        owner:string
    }
    RoomMessages:MessageIF[]
    RoomUsers:UserIF[]
    CreateNewRoomUsers:UserIF[]
}


const initalState:initalStateTyep = {
    roomInfo:{
        _id:'',
        name:'',
        imageUrl:'',
        owner:'',
    },
    RoomMessages:[],
    RoomUsers:[],
    CreateNewRoomUsers:[]
}


const RoomSlice = createSlice({
    name:'room',
    initialState:initalState,
    reducers:{
        
        saveRoomInfo:(state,action) =>{
            state.roomInfo = action.payload
        },

        saveRoomUsers:(state,action)=>{
            state.RoomUsers = action.payload
        },
        saveRoomNewUser:(state,aciton) =>{
            state.RoomUsers.push(aciton.payload)
        },
        removeRoomUser:(state,aciton) =>{

            state.RoomUsers = state.RoomUsers.filter(p =>{
                return p._id !== aciton.payload._id
            })  
        },

        saveRooMessages:(state,action) =>{
            state.RoomMessages = action.payload
        },
        saveNewRoomMessage:(state,action) =>{
            state.RoomMessages.push(action.payload)

        },
        addUserToNewRoom:(state,action) =>{
            state.CreateNewRoomUsers = action.payload
        }


    }
})

export const {saveRoomInfo,saveRoomUsers,saveRoomNewUser,removeRoomUser,saveRooMessages,saveNewRoomMessage,addUserToNewRoom}  = RoomSlice.actions

export const RoomInfo = (state:RootState) => state.room.roomInfo
export const RoomUsers = (state:RootState) => state.room.RoomUsers
export const RoomMessages = (state:RootState) => state.room.RoomMessages
export const NewRoomUsers = (state:RootState) => state.room.CreateNewRoomUsers

export default RoomSlice