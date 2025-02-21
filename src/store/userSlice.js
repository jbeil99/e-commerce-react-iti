import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getUser,

} from "../api/user";
import { currentUser } from "../js/validation/loginValidation";

const initialState = {
    user: null,
    isLoading: true,
    errors: null,
};

export const getUserAction = createAsyncThunk(
    "cart/getUserAction",
    async (userID, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getUser(userID);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = null
        },
        getCurrentUser: (state, action) => {
            state.user = JSON.parse(sessionStorage.getItem('user'));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserAction.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserAction.rejected, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });

    },
});

export const userReducer = userSlice.reducer;
export const { removeUser, setCurrentUser, getCurrentUser } = userSlice.actions;