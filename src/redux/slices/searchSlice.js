import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    inputValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeValue: (state, action) => {
            state.inputValue = action.payload;
        }
    }
});

export const { changeValue } = searchSlice.actions;

export default searchSlice.reducer