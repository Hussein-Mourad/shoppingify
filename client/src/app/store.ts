import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import shoppingListReducer from "features/shoppingList/shoppingListSlice";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, shoppingList: shoppingListReducer },
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
