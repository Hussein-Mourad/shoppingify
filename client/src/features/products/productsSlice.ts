import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "app/store";
import IProduct from "types/Product";

// export interface IProductsState {
//   products: IProduct[];
//   status: "idle" | "loading" | "failed";
// }

const productsAdapter = createEntityAdapter<IProduct>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  status: "idle",
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products/");
    const data = await response.json();
    return data.products;
  }
);

export const addProduct = createAsyncThunk(
  "products/AddProduct",
  async (product: IProduct) => {
    const response = await fetch("/api/products/", {
      method: "POST",
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data.product;
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
        state.status = "succeeded";
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, productsAdapter.addOne);
  },
});

export default productsSlice.reducer;
