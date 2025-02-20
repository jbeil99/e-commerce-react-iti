import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";

export const myStore = configureStore({
    reducer: {
        productSlice: productReducer,
        cartSlice: cartReducer,
    },
});