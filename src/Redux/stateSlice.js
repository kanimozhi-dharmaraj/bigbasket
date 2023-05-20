import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name : 'sample',
    initialState : {
        cartItems : [],
        
    },
    reducers : {
       
        ADD_ITEMS : (state,action)=>{
            state.tasks = action.payload
        },
        UPDATE_ITEMS : (state,action)=>{
            state.tasks = action.payload
        },
        DELETE_ITEMS : (state,action)=>{
            state.tasks = action.payload
        },
        
    }
});
export const {UPDATE_ITEMS} = stateSlice.actions;
export default stateSlice.reducer;