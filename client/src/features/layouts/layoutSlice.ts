import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISideDrawerState {
  isSideDrawerOpen: boolean;
  sideDrawerType: "shoppingList" | "addForm" | "viewContent";
}
const initialState: ISideDrawerState = {
  isSideDrawerOpen: true,
  sideDrawerType: "shoppingList",
};

export const layoutSlice = createSlice({
  name: "Layout",
  initialState,
  reducers: {
    toggleSideDrawer: (
      state: ISideDrawerState,
      action: PayloadAction<ISideDrawerState["sideDrawerType"]>
    ) => {
      state.sideDrawerType = action.payload;
      state.isSideDrawerOpen = !state.isSideDrawerOpen;
    },
    setSideDrawerState: (
      state: ISideDrawerState,
      action: PayloadAction<ISideDrawerState>
    ) => {
      state.isSideDrawerOpen = action.payload.isSideDrawerOpen;
      state.sideDrawerType = action.payload.sideDrawerType;
    },
  },
});

export const { toggleSideDrawer, setSideDrawerState } = layoutSlice.actions;
export default layoutSlice.reducer;
