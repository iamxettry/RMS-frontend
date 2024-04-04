import {createSlice} from '@reduxjs/toolkit';
const initialState={
    cartCount:0,
    prevValue:0
}

const cartCountSlice= createSlice({
    name:"cartCount",
    initialState,
    reducers:{
        setCartCount:(state,actions)=>{
            state.prevValue=state.cartCount,
            state.cartCount =actions.payload
        }
    }
})

export const {setCartCount} =cartCountSlice.actions
export default cartCountSlice.reducer

export const selectCartCount =(state)=>state.cartvalue.cartCount
export const selectPrevCount =(state)=>state.cartvalue.prevValue