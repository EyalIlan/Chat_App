import {configureStore} from '@reduxjs/toolkit'
import userSlice from './reducers/user'
import RoomSlice from './reducers/room'
import FeatureSlice from './reducers/feature'

export const store = configureStore({
    reducer:{
        room:RoomSlice.reducer,
        user:userSlice.reducer,
        feature:FeatureSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>