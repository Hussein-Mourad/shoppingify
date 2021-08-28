import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "app/store";
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
  errors: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/AddProduct",
  async (
    product: {
      name: string;
      categoryName: string;
      imageUrl?: string;
      description?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/products/", product);
      return response.data;
    } catch (err) {
      if (err?.response?.data?.errors)
        return rejectWithValue({
          error: "Validation failed",
          data: err.response.data.errors,
        });
      throw err;
    }
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
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.errors = "Check your internet connection and try again.";
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.rejected, (state, action:PayloadAction<any>) => {
        state.status = "failed";
        state.errors = action.payload.data;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.concat(action.payload.product);
      });
  },
});

export const selectAllProducts = (state: AppState) => state.products.products;
export const selectFilterdProducts = (state: AppState, filterTerm: string) =>
  state.products.products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

export default productsSlice.reducer;
