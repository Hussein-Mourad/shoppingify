import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "app/store";
import axios from "axios";
import { setSideDrawerState } from "features/layouts/layoutSlice";
import IProduct from "types/Product";

export interface IProductsState {
  products: IProduct[];
  productWithDetails: IProduct;
  status: "idle" | "loading" | "failed" | "success";
  errors: any;
}

const initialState: IProductsState = {
  products: [],
  productWithDetails: { _id: "", name: "", category: { _id: "", name: "" } },
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
  reducers: {
    changeCurrentProduct: (
      state: IProductsState,
      action: PayloadAction<IProduct>
    ) => {
      state.productWithDetails = action.payload;
    },
    setState: (
      state: IProductsState,
      action: PayloadAction<IProductsState>
    ) => {
      state.products = action.payload.products;
      state.productWithDetails = action.payload.productWithDetails;
      state.status = action.payload.status;
      state.errors = action.payload.errors;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.errors = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.products;
        state.errors = null;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.errors = "Check your internet connection and try again.";
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.errors = action.payload.data;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.concat(action.payload.product);
      });
  },
});

export const showProductDetails = (product: IProduct): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(productsSlice.actions.changeCurrentProduct(product));
  dispatch(
    setSideDrawerState({
      isSideDrawerOpen: true,
      sideDrawerType: "viewContent",
    })
  );
};

export const deleteProduct = (product: IProduct): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(
    productsSlice.actions.setState({
      ...getState().products,
      status: "loading",
      errors: null,
    })
  );
  try {
    await axios.delete("/api/products/" + product._id);
    dispatch(
      setSideDrawerState({
        isSideDrawerOpen: false,
        sideDrawerType: "viewContent",
      })
    );
    dispatch(
      productsSlice.actions.setState({
        ...getState().products,
        products: getState().products.products.filter(
          (item) => item._id !== product._id
        ),
        status: "success",
        errors: null,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      productsSlice.actions.setState({
        ...getState().products,
        status: "failed",
        errors: "Error deleting the product",
      })
    );
  }
};

export const selectAllProducts = (state: AppState) => state.products.products;
export const selectFilterdProducts = (state: AppState, filterTerm: string) =>
  state.products.products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(filterTerm.toLowerCase())
  );
export const selectViewedProduct = (state: AppState) =>
  state.products.productWithDetails;

export default productsSlice.reducer;
