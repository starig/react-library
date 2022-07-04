import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from "./slices/itemsSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        items: itemsSlice,
        search: searchSlice
    },
})