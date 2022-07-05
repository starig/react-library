import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    inputValue: '',
    sortValue: 'relevance',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setSortValue: (state, action) => {
            state.sortValue = action.payload;
        }
    }
});

export const { changeValue, setSortValue } = searchSlice.actions;

export default searchSlice.reducer