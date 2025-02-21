import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";

export const myStore = configureStore({
    reducer: {
        productSlice: productReducer,
        cartSlice: cartReducer,
        userSlice: userReducer
    },
});