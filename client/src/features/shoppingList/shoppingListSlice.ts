import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "app/store";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList";
import IProduct from "types/Product";
import { setSideDrawerState } from "features/layouts/layoutSlice";


const initialState: IShoppingList = {
  name: "",
  status: "current",
  products: [],
};

export const addAsync = createAsyncThunk(
  "shoppingList/addAsync",
  async (shoppingList: IShoppingList) => {
    const response = await fetch("/api/shoppinglist/", {
      method: "POST",
      body: JSON.stringify({
        name: shoppingList.name,
        products: shoppingList.products,
        status: shoppingList.status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: IShoppingList = await response.json();
    return data;
  }
);

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    changeName: (state: IShoppingList, action: PayloadAction<string>) => {
      if (action.payload) state.name = action.payload;
    },
    addProductToList: (
      state: IShoppingList,
      action: PayloadAction<IProduct>
    ) => {
      const item: IShoppingListItem = {
        ...action.payload,
        quantity: 1,
        completed: false,
      };
      const product = state.products.find(
        (product) => product.name === action.payload.name
      );
      !product && state.products.push(item);
    },
    removeProduct: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      state.products = state.products.filter(
        (product) => product.name != action.payload.name
      );
    },
    incrementQuantity: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.products.find(
        (product) => product.name === action.payload.name
      );
      product && product.quantity++;
    },
    decrementQuantity: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.products.find(
        (product) => product.name === action.payload.name
      );
      product && (product.quantity = Math.max(product.quantity - 1, 1));
    },
    toggleComplete: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.products.find(
        (product) => product.name === action.payload.name
      );
      product && (product.completed = !product.completed);
    },
    completeList: (state: IShoppingList) => {
      state.status = "completed";
    },
    cancelList: (state: IShoppingList) => {
      state.status = "cancelled";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAsync.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.products = action.payload.products;
      state.status = action.payload.status;
    });
  },
});

export const selectShoppingList = (state: AppState) => state.shoppingList;
export const selectProductsCount = (state: AppState) =>
  state.shoppingList.products.length;

export const {
  changeName,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  toggleComplete,
  completeList,
  cancelList,
} = shoppingListSlice.actions;

export const addProduct = (product: IProduct): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.addProductToList(product));
  dispatch(
    setSideDrawerState({
      isSideDrawerOpen: true,
      sideDrawerType: "shoppingList",
    })
  );
  // dispatch(addAsync(getState().shoppingList));
};



export default shoppingListSlice.reducer;
