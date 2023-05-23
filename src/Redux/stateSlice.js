import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name : 'sample',
    initialState : {
        cartItems : {},
        
    },
    reducers : {
       
        ADD_ITEMS : (state,action)=>{
            state.cartItems = action.payload
        },
        UPDATE_ITEMS : (state,action)=>{
            state.cartItems = action.payload
        },
        UPDATE_CART_ITEMS : (state,action)=>{
            state.cartItems = action.payload
        },
        
    }
});
export const {UPDATE_ITEMS} = stateSlice.actions;
export default stateSlice.reducer;