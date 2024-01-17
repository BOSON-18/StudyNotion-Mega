import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        totalItems:localStorage.getItem("totalItems")?Json.parse(localStorage.getItem("totalItems")):0,
    },
    reducers:{
setTotalItems:(state,action)=>{
    state.totalItems=action.payload;
}

    }
})

export const{setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;