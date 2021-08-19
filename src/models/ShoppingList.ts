import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { ICategory } from "./Category";

interface IShoppingList {
  userId: Schema.Types.ObjectId;
  name: string;
  status: "cancelled" | "completed" | "current";
  products: [
    {
      _id: Schema.Types.ObjectId;
      name: String;
      category: PopulatedDoc<ICategory & Document>[];
      quantity: number;
      completed:Boolean;
    }
  ];
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
      enum: ["current", "cancelled", "completed"],
    },
    products: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        quantity: { type: Number, default: 0 },
        completed: { type: Boolean, default: false}
      },
    ],
  },
  { timestamps: true }
);

const ShoppingList = model("ShoppingList", shoppingListSchema);
export default ShoppingList;
