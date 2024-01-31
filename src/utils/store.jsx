import { configureStore } from "@reduxjs/toolkit";
//import rootReducer from "./reducers";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";

 const appStore= configureStore({
    
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        profile:profileSlice
    }
})

export default appStore