import { Document, model, Model, Schema } from "mongoose";

export interface ICategory {
  user: Schema.Types.ObjectId;
  name: string;
}

interface CategoryModel extends Model<ICategory> {
  checkUserCategory(
    _id: string,
    userId: string
  ): ICategory & Document<any, any, ICategory>;
}

export const categorySchema = new Schema<ICategory, CategoryModel>(
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

categorySchema.statics.checkUserCategory = async function (
  _id: string,
  userId: string
) {
  const category = await this.findOne({ _id, userId });
  if (category) {
    return category;
  }
  throw new Error("Category is not found");
};

const Category = model("Category", categorySchema);

export default Category;
