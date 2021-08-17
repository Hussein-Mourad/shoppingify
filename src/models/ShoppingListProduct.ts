import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { ICategory } from "./Category";
import {IProduct} from "./Product"
import isValidImageUrl from "../utils/isValidImageUrl"

export interface IShoppingListProduct extends IProduct{
 quantity: number
}

export const productSchema = new Schema<IShoppingListProduct>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      maxLength: [30, "Max Length is 30 characters"],
      index:true
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: [
        async (str:string) => {
          const result = await isValidImageUrl(str);
          return result;
        },
        "Invalid image url.",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "Max Length is 300 characters"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category id is required"],
    },
  },
  { timestamps: true }
);


const Product = model("Product", productSchema);

export default Product;
