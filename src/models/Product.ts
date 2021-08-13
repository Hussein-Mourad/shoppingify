import { model, Schema } from "mongoose";

export interface IProduct {
  user: Schema.Types.ObjectId;
  name: string;
  imageUrl?: string;
  description?: string;
  category: Schema.Types.ObjectId;
}

export const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:[true, "User id is required"]
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      maxLength:[30, "Max Length is 30 characters"]
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength:[300,"Max Length is 300 characters"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required:[true, "Category is required"]
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
