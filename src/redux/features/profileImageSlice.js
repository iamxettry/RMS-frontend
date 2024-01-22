import {createSlice} from '@reduxjs/toolkit'

const profileSlice=createSlice({
    name:"profileImage",
    initialState:{profile_picture:''},
    reducers:{
        setProfile: (state,actions)=>{
            state.profile_picture=actions.payload
        }
    }
})

export const {setProfile}=profileSlice.actions

export default profileSlice.reducer

export const selectProfileImage=(state)=>state.profile.profile_picture