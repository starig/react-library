import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from "./slices/itemsSlice";
import searchSlice from "./slices/searchSlice";
import bookSlice from "./slices/bookSlice";

export const store = configureStore({
    reducer: {
        items: itemsSlice,
        search: searchSlice,
        book: bookSlice,
    },
})