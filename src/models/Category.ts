import { Document, model, Model, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface ICategory {
  userId: PopulatedDoc<IUser & Document>;
  name: string;
}

export const categorySchema = new Schema<ICategory, Model<ICategory>, ICategory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      maxLength: [30, "Max Length is 30 characters"],
    },
  },
  { timestamps: true }
);


const Category = model<ICategory>("Category", categorySchema);

export default Category;
