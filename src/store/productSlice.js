import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    addNewProduct,
    deleteProduct,
    getAllProducts,
    editProduct
} from "../api/product";

const initialState = {
    products: [],
    isLoading: true,
    errors: null,
};

export const getAllProductsAction = createAsyncThunk(
    "product/getAllProductsAction",

    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            let response = await getAllProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProductAction = createAsyncThunk(
    "product/deleteProductAction",
    async (productId, { rejectWithValue }) => {
        try {
            await deleteProduct(productId);
            return productId;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addProductAction = createAsyncThunk(
    "product/addProductAction",
    async (product, { rejectWithValue }) => {
        try {
            let response = await addNewProduct(product);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editProductAction = createAsyncThunk(
    "product/addProductAction",
    async (args, { rejectWithValue }) => {
        try {
            let response = await editProduct(args.id, args.productData);
            console.log(args);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);




const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        search: (state, action) => {
            state.products = state.products.filter(product => product.name.toLowerCase().match(action.payload.toLowerCase()));
        },
        filter: (state, action) => {
            const { category, price } = action.payload
            if (category == 0 && price == 0) {
                return
            }
            if (category != 0 && price == 0) {
                state.products = state.products.filter(product => {
                    console.log(product.category.id, category)
                    return product.category.id == category
                })
            }

            if (category != 0 && price != 0) {
                console.log('hi')
                if (price == 1) {
                    state.products = state.products.filter(product => product.category.id == category && (Number(product.customerPrice) > 20));
                }
                if (price == 2) {
                    state.products = state.products.filter(product =>
                        product.category.id == category &&
                        Number(product.customerPrice) >= 20 &&
                        Number(product.customerPrice) <= 100
                    );
                }

                if (price == 3) {
                    state.products = state.products.filter(product => product.category.id == category && (Number(product.customerPrice) > 100));
                }
            }
            if (category == 0 && price != 0) {
                console.log(price)
                if (price == 1) {
                    state.products = state.products.filter(product => Number(product.customerPrice) > 20);
                }
                if (price == 2) {
                    state.products = state.products.filter(product => {
                        return Number(product.customerPrice) >= 20 &&
                            Number(product.customerPrice) <= 100
                    });
                }
                if (price == 3) {
                    state.products = state.products.filter(product => {
                        console.log(product.customerPrice)
                        return Number(product.customerPrice) > 100
                    });
                }
            }

        },
        getBestDeals: (state, action) => {
            state.products = state.products.filter(product => Number(product.sale) > action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsAction.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(getAllProductsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        });
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.products = state.products.filter(
                (product) => product.id != action.payload
            );
        });
    },
});

export const productReducer = productSlice.reducer;
export const { search, getBestDeals, filter } = productSlice.actions;