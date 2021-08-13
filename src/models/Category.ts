import { model, Model, Schema, Document } from "mongoose";

export interface ICategory {
  user: Schema.Types.ObjectId;
  name: string;
}

interface CategoryModel extends Model<ICategory> {
  isValidCategory(_id: string, userId:string): ICategory & Document<any, any, IUser>;
}

export const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    user: {
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

categorySchema.statics.isValidCategory = async function (
  _id: string,
  userId: string
) {
  const category = await this.findOne({ _id, user: userId });
  if (category) {
    return category;
  }
  throw new Error("Category not found");
};
const Category = model("Product", categorySchema);

export default Category;
