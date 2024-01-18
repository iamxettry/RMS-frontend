import {configureStore} from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'

import darkReducer from "./features/darkmodeSlice"
import cartReducer from "./features/CartCountSlice"
import searchReducer from './features/searchTerm'
import quantityReducer from './features/productCount'
import totalReducer from './features/grandTotal'

import {userApi} from "./services/users/userApi"
export const store=configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        dark:darkReducer,
        cartvalue:cartReducer,
        searchValue:searchReducer,
        counter:quantityReducer,
        total:totalReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)