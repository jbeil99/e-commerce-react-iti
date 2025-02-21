import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    deleteCartProduct,
    emptyCart,
    addProductToCart,
    updateCartItemsQuantity,
    getUserCart,
    addProdcutToSessionCart,
    removeProdcutToSessionCart
} from "../api/cart";

const initialState = {
    cart: null,
    isLoading: true,
    errors: null,
};

export const getCartAction = createAsyncThunk(
    "cart/getCartAction",
    async (userID, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getUserCart(userID);
            return response.data.length !== 0 ? response.data[0] : JSON.parse(sessionStorage.getItem('cart'));
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
            const response = await addProductToCart(args.cartID, args.productID, args.quantity);
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
    reducers: {
        addProductToCartSessionAction: (state, action) => {
            addProdcutToSessionCart(action.payload);
            state.cart = JSON.parse(sessionStorage.getItem('cart'));
        },
        removeProdcutToSessionCartAction: (state, action) => {
            removeProdcutToSessionCart(action.payload);
            state.cart.items = state.cart.items.filter(item => item.productID !== action.payload);
        }
    },
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
        builder.addCase(emptyCartAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = { id: action.payload.id, items: [] };
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const { addProductToCartSessionAction, removeProdcutToSessionCartAction } = cartSlice.actions;