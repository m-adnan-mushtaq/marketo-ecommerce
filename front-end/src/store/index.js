//create store
import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

 export const store=configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:process.env.NODE_ENV!=='production'
})

