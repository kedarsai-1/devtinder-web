import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReucer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestReducer from './requestSlice'

const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReucer,
        connection:connectionReducer,
        requests:requestReducer

    }
})
export default appStore
