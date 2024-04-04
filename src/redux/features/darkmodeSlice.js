import {createSlice} from '@reduxjs/toolkit';

const darkSlice=createSlice({
    name:'darkMode',
    initialState:{darkmode:true},
    reducers:{
        setDarkMode:(state,action)=>{
            state.darkmode=action.payload
        },
    },

})

export const {setDarkMode} =darkSlice.actions

export default darkSlice.reducer

export const  selectCurrentMode=(state)=>state.dark.darkmode;