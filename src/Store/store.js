import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Store/authSlice"
const store=configureStore({
    reducer:{
        authstore:authReducer
    }
})

export default store;