import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    page: 1,
    isFetching: true,
    isLoading: false,
    loadMore: false,
    categories: [
        'All',
        'Art',
        'Biography',
        'Computers',
        'History',
        'Medical',
        'Poetry'
    ],
    activeCategory: 'All',
}

export const fetchBooks = createAsyncThunk('items/fetchBooksStatus', async (params) => {
    const {inputValue, page, sortValue} = params;
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}&orderBy=${sortValue}&startIndex=${page * 30 - 30}&maxResults=30&key=AIzaSyDhty8cjF6CMX1BYIPhMn7Qtg-DNyYGWOs`);
    return data;
});

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
        },
        setCategory: (state, action) => {
            state.activeCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            if (state.activeCategory !== 'All') {
                action.payload.items = action.payload.items.filter(function (item) {
                    return item.volumeInfo.categories?.includes(state.activeCategory)
                });
            }
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

export const { pagePlus, onNewSearchValue, setCategory } = itemsSlice.actions

export default itemsSlice.reducer