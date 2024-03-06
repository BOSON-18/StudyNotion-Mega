import { configureStore } from "@reduxjs/toolkit";
//import rootReducer from "./reducers";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import courseSlice from "./slices/courseSlice";

 const appStore= configureStore({
    
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        profile:profileSlice,
        course:courseSlice,
    }
})

export default appStore