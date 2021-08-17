import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { IProduct } from "./Product";

interface IShoppingList {
  userId: Schema.Types.ObjectId;
  name: string;
  status: "cancelled" | "completed" | "current";
  products: PopulatedDoc<IProduct & Document>[];
}

const shoppingListSchema = new Schema<IShoppingList>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Invalid user id."],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter a name"],
      maxLength: [30, "Shoppinglist name is too long."],
    },
    status: {
      type: String,
      default: "current",
      required: [true, "Please enter a status."],
      validate: [
        (str: string) => {
          return ["cancelled", "completed", "current"].includes(str);
        },
        "Please enter a valid status: cancelled or completed or current",
      ],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
  },
  { timestamps: true }
);

const ShoppingList = model("ShoppingList", shoppingListSchema);
export default ShoppingList;
