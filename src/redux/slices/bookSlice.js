import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBook = createAsyncThunk('book/fetchBookStatus', async (id) => {
    const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return data;
});

const initialState = {
    book: {
        volumeInfo: {
            categories:'',
            title: '',
            authors: '',
            description: '',
            imageLinks: {
                medium: '',
            }
        }
    },
    isLoading: true,
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.book = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchBook.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBook.rejected, (state) => {
            state.isLoading = false;
            console.error('error');
        });
    }
});


export default bookSlice.reducer;