import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getCart,
    addUserCart,
    deleteCartProduct,
    emptyCart,
    checkProduct,
    addProductToCart,
    addProdcutToLocalStorageCart,
    updateCartItemsQuantity
} from "../api/cart";

const initialState = {
    cart: [],
    isLoading: true,
    errors: null,
};

export const getCartAction = createAsyncThunk(
    "cart/getCartAction",
    async (cartID, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getCart(cartID);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const emptyCartAction = createAsyncThunk(
    "cart/emptyCartAction",
    async (cartID, { rejectWithValue }) => {
        try {
            emptyCart(cartID);
            return cartID;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const deleteCartProductAction = createAsyncThunk(
    "cart/deleteCartProductAction",
    async (args, { rejectWithValue }) => {
        try {
            console.log(args)
            const response = await deleteCartProduct(args.cartID, args.productID);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addProductToCartAction = createAsyncThunk(
    "cart/addProductToCartAction",
    async (args, { rejectWithValue }) => {
        try {
            const response = await addProductToCartAction(args.cartID, args.productID, args.quantity);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateCartItemsQuantityAction = createAsyncThunk(
    "cart/updateCartItemsQuantityAction",
    async (args, { rejectWithValue }) => {
        try {
            const response = await updateCartItemsQuantity(args.cartID, args.productID, args.quantity, args.userID);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartAction.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCartAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
        });
        builder.addCase(getCartAction.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        });
    },
});

export const cartReducer = cartSlice.reducer;
