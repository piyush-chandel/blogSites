import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    initialState:{
        userData:null,
        status:false
    },
    name:'authstore',
    reducers:{
        login:(state,action)=>{
            
            state.userData=action.payload;
            state.status=true;
        },
        logout:(state)=>{
            state.status=false;
            
        }


    }
})


export const {login,logout}=authSlice.actions;
export default authSlice.reducer;