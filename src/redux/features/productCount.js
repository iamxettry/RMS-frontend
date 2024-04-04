import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 1 }

const orderSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setProductCount: (state, action) => {
        state.value = action.payload
      },
   
  },
})



export const { setProductCount } = orderSlice.actions
export default orderSlice.reducer

export const selectCount = (state) => state.counter.value