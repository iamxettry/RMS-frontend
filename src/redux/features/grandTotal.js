import { createSlice } from '@reduxjs/toolkit'


const grandTotalSlice=createSlice({
    name:"grandTotal",
    initialState:{
      grandTotal:0
    },
    reducers:{
      setGrandTotal:(state,action)=>{
        state.grandTotal=action.payload
      }
    }
  })
  
  export const {setGrandTotal} = grandTotalSlice.actions

  export default grandTotalSlice.reducer

export const selectGrandTotal = (state) => state.total.grandTotal
