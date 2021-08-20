import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type IProduct from "types/Product"

export interface IProductDetails {
  product:IProduct
}

const initialState:IProductDetails= {
  product:{name:"", category:{name:""}}
}

export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    showProductDetails:(state:IProductDetails, action:PayloadAction<IProduct>)=>{
      state.product=action.payload
    } 
  },
})

export const { showProductDetails } = productDetailSlice.actions
export default productDetailSlice.reducer
