import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'


interface InitialState{
    Showmenu:boolean
    sidemenuType:string
    showModal:boolean
    screenSelectPhone:string
}

const initialState:InitialState ={

    Showmenu:false,
    sidemenuType:'',
    showModal:false,
    screenSelectPhone:'users'
}


const FeatureSlice = createSlice({
    name:'feature',
    initialState:initialState,
    reducers:{

        SidemenuChange:(state,action) =>{
            
            state.Showmenu = action.payload

        },

        SidemenuType:(state,action) =>{
            state.sidemenuType = action.payload
        },

        ChangeModalShowing:(state,action) =>{
            state.showModal = action.payload
        },
        changeScreenPhone:(state,action) =>{
            state.screenSelectPhone = action.payload
        }
    }
})

export const {SidemenuChange,SidemenuType,ChangeModalShowing,changeScreenPhone} = FeatureSlice.actions

export const Showmenu = (state:RootState) => state.feature.Showmenu
export const sideMenuType = (state:RootState) => state.feature.sidemenuType
export const showModal = (state:RootState) => state.feature.showModal
export const PhoneScreen = (state:RootState) => state.feature.screenSelectPhone

export default FeatureSlice