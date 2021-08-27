import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "app/store";
import axios from "axios";
import IProduct from "types/Product";

export interface IProductsState {
  products: IProduct[];
  status: "idle" | "loading" | "failed" | "success";
  errors: any;
}

const initialState: IProductsState = {
  products: [],
  status: "idle",
  errors: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data.products;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/AddProduct",
  async (product: {
    name: string;
    categoryName: string;
    imageUrl?: string;
    description?: string;
  }) => {
    const response = await axios.post("/api/products/", product);
    console.log("🚀 ~ file: productsSlice.ts ~ line 35 ~ response", response)
    return response.data.product;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.errors = "Check your internet connection and try again.";
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.status = "failed";
        state.errors = "Check your internet connection and try again.";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.errors) {
          state.errors = action.payload.errors;
        } else {
          state.products = state.products.concat(action.payload);
        }
      });
  },
});

export default productsSlice.reducer;
