import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk('items/fetchBooksStatus', async (params) => {
    const {q, page} = params;
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${page * 30 - 30}&maxResults=30&key=AIzaSyDhty8cjF6CMX1BYIPhMn7Qtg-DNyYGWOs`);
    return data;
});


const initialState = {
    items: [],
    page: 1,
    isFetching: true,
    isLoading: false,
    loadMore: false,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        pagePlus: (state) => {
            state.page += 1;
            state.loadMore = true;
        },
        onNewSearchValue: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            if (state.loadMore) {
                state.items.items = [...state.items.items, ...action.payload.items]
            } else {
                state.page = 1;
                state.items = action.payload;
            }
            state.isFetching = false;
            state.isLoading = false;
            state.loadMore = false;
        });
        builder.addCase(fetchBooks.pending, (state) => {
            state.isFetching = true;
            state.isLoading = true;
        });
        builder.addCase(fetchBooks.rejected, (state) => {
            state.isFetching = false;
            state.isLoading = false;
            console.error('error');
        })
    }
});

export const {pagePlus, onNewSearchValue} = itemsSlice.actions

export default itemsSlice.reducer