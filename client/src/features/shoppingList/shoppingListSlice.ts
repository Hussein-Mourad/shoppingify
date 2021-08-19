import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "app/store";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList"; 
import IProduct from "types/Product";

const initialState: IShoppingList = {
  name: "",
  status: "current",
  products: [],
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    changeName: (state: IShoppingList, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addProduct: (state: IShoppingList, action: PayloadAction<IProduct>) => {
      const item: IShoppingListItem = {
        ...action.payload,
        quantity: 1,
        completed: false,
      };
      state.products.push(item);
    },
    removeProduct: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      state.products.filter((product) => product.name === action.payload.name);
    },
    incrementQuantity: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      state.products.forEach((product) => {
        if (product.name === action.payload.name) {
          product.quantity++;
        }
      });
    },
    decrementQuantity: (
      state: IShoppingList,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product =state.products.find((product) => product.name === action.payload.name);
      product&&(product.quantity=Math.max(product.quantity-1,1))
      state.products.forEach((product) => {
        if (product.name === action.payload.name) {
          product.quantity = Math.max(product.quantity - 1, 1);
        }
      });
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
  },
});

export const selectShoppingList = (state: AppState) => state.shoppingList;

export const {
  changeName,
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
