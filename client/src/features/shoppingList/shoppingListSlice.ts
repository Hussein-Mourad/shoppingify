import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "app/store";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList";
import IProduct from "types/Product";
import { setSideDrawerState } from "features/layouts/layoutSlice";
import axios from "axios";

export interface IShoppingListState {
  shoppingList: IShoppingList;
  status: "idle" | "loading" | "failed" | "success";
  error: any;
}

const initialState: IShoppingListState = {
  shoppingList: {
    _id: "",
    name: "",
    status: "current",
    products: [],
    createdAt: "" 
  },
  status: "idle",
  error: null,
};

export const fetchShoppingist = createAsyncThunk(
  "shoppingList/fetchShoppingist",
  async () => {
    const response = await axios.get("/api/shoppinglists?status=current");
    return response.data;
  }
);

export const createOrUpdateShoppingList = createAsyncThunk(
  "shoppingList/updateShoppingList",
  async (shoppingList: IShoppingList) => {
    const response = await axios.post("/api/shoppinglists/", shoppingList);
    return response.data;
  }
);

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    changeName: (state: IShoppingListState, action: PayloadAction<string>) => {
      if (action.payload) state.shoppingList.name = action.payload;
    },
    addProduct: (
      state: IShoppingListState,
      action: PayloadAction<IProduct>
    ) => {
      const item: IShoppingListItem = {
        ...action.payload,
        quantity: 1,
        completed: false,
      };
      const product = state.shoppingList.products.find(
        (product) => product.name === action.payload.name
      );
      !product && state.shoppingList.products.push(item);
    },
    removeProduct: (
      state: IShoppingListState,
      action: PayloadAction<IShoppingListItem>
    ) => {
      state.shoppingList.products = state.shoppingList.products.filter(
        (product) => product.name != action.payload.name
      );
    },
    incrementQuantity: (
      state: IShoppingListState,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.shoppingList.products.find(
        (product) => product.name === action.payload.name
      );
      product && product.quantity++;
    },
    decrementQuantity: (
      state: IShoppingListState,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.shoppingList.products.find(
        (product) => product.name === action.payload.name
      );
      product && (product.quantity = Math.max(product.quantity - 1, 1));
    },
    toggleComplete: (
      state: IShoppingListState,
      action: PayloadAction<IShoppingListItem>
    ) => {
      let product = state.shoppingList.products.find(
        (product) => product.name === action.payload.name
      );
      product && (product.completed = !product.completed);
    },
    completeList: (state: IShoppingListState) => {
      state.shoppingList.status = "completed";
    },
    cancelList: (state: IShoppingListState) => {
      state.shoppingList.status = "cancelled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchShoppingist.fulfilled, (state, action) => {
        const lists = action.payload.shoppingLists;
        if (lists.length > 0) state.shoppingList = lists[0];
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchShoppingist.rejected, (state) => {
        state.status = "failed";
        state.error = "Error getting shopping list data";
      })
      .addCase(createOrUpdateShoppingList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrUpdateShoppingList.fulfilled, (state, action) => {
        const list = action.payload.shoppingList;
        if (list.status === "current") {
          state.shoppingList = action.payload.shoppingList;
        } else {
          state.shoppingList = initialState.shoppingList;
        }
        state.status = "success";
        state.error = null;
      })
      .addCase(createOrUpdateShoppingList.rejected, (state) => {
        state.status = "failed";
        state.error = "Error updating shopping list data";
      })
  },
});

export const selectShoppingList = (state: AppState) =>
  state.shoppingList.shoppingList;
export const selectProductsCount = (state: AppState) =>
  state.shoppingList.shoppingList.products.length;

  // TODO Ensure that fetching is successful before chaning state
export const addProduct = (product: IProduct): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.addProduct(product));
  dispatch(
    setSideDrawerState({
      isSideDrawerOpen: true,
      sideDrawerType: "shoppingList",
    })
    );
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};


export const removeProduct = (product: IShoppingListItem): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.removeProduct(product));
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};

export const incrementQuantity = (product: IShoppingListItem): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.incrementQuantity(product));
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};

export const decrementQuantity = (product: IShoppingListItem): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.decrementQuantity(product));
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};

export const changeName = (name: string): AppThunk => (dispatch, getState) => {
  dispatch(shoppingListSlice.actions.changeName(name));
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};

export const toggleComplete = (product: IShoppingListItem): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(shoppingListSlice.actions.toggleComplete(product));
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};
export const completeList = (): AppThunk => (dispatch, getState) => {
  dispatch(shoppingListSlice.actions.completeList());
  dispatch(
    setSideDrawerState({
      isSideDrawerOpen: false,
      sideDrawerType: "shoppingList",
    })
  );
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};
export const cancelList = (): AppThunk => (dispatch, getState) => {
  dispatch(shoppingListSlice.actions.cancelList());
  dispatch(
    setSideDrawerState({
      isSideDrawerOpen: false,
      sideDrawerType: "shoppingList",
    })
  );
  dispatch(createOrUpdateShoppingList(getState().shoppingList.shoppingList));
};

export default shoppingListSlice.reducer;
