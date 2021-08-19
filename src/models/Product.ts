import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { ICategory } from "./Category";
import isValidImageUrl from "../utils/isValidImageUrl"

export interface IProduct {
  userId: Schema.Types.ObjectId;
  name: string;
  imageUrl?: string;
  description?: string;
  category: PopulatedDoc<ICategory & Document>;
}

export const productSchema = new Schema<IProduct>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
      maxLength: [30, "Max Length is 30 characters"],
      trim: true,
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
  { timestamps: true, discriminatorKey:"kind" }
);


const Product = model("Product", productSchema);

export default Product;
