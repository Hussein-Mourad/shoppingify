import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "app/store";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList";
import IProduct from "types/Product";

const initialState: IShoppingList = {
  name: "",
  status: "current",
  products: [],
  isOpen: false,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    changeName: (state: IShoppingList, action: PayloadAction<string>) => {
      if (action.payload) state.name = action.payload;
    },
    addProduct: (state: IShoppingList, action: PayloadAction<IProduct>) => {
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
      // state.products.splice(state.products.indexOf(action.payload) - 1, 1);
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
    setOpenState: (state: IShoppingList, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    completeList: (state: IShoppingList) => {
      state.status = "completed";
    },
    cancelList: (state: IShoppingList) => {
      state.status = "cancelled";
    },
  },
});

export const selectShoppingList = (state: AppState) => state.shoppingList;
export const selectProductsCount = (state: AppState) =>
  state.shoppingList.products.length;
export const selectOpenState = (state: AppState) => state.shoppingList.isOpen;

export const {
  changeName,
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  toggleComplete,
  setOpenState,
  completeList,
  cancelList,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
