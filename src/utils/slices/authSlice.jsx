import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:"auth",
    initialState:{
        signupData: null,
        loading: false,
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,  
      },
    reducers:{
        setToken(state,action){
            state.token=action.payload;

            localStorage.setItem("token", JSON.stringify(action.payload));

            // Set expiration time (assuming expiresIn is in seconds)
            const expirationTime = new Date().getTime() + 2*60*60 ;
            localStorage.setItem("expirationTime", expirationTime);
            
        },
        setSignupData(state,action){
            state.signupData=action.payload;
        },
        setLoading(state,action){
            state.loading=action.payload
        },
         removeExpiredToken(state) {
            const expirationTime = localStorage.getItem("expirationTime");
            if (expirationTime && new Date().getTime() > expirationTime) {
                // Remove token and expiration time from state and localStorage
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("expirationTime");
            }
        },
    }
})


export const{setToken,setLoading,setSignupData}= authSlice.actions;
export  default authSlice.reducer;