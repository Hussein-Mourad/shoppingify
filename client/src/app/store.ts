import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import shoppingList from "features/shoppingList/shoppingListSlice";
import layout from "features/layouts/layoutSlice"
import productDetails from "features/productDetails/productDetailsSlice"
import products from "features/products/productsSlice"

export function makeStore() {
  return configureStore({
    reducer: {  shoppingList , layout, productDetails, products },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
