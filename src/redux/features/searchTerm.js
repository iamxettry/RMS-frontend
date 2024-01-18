import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: '' };

const filterSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearchTerm } = filterSlice.actions;
export default filterSlice.reducer;

export const selectSearchValue = (state) => state.searchValue.search;
