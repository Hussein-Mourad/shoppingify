import ICategory from "./Category";

export default interface IProduct {
  readonly _id: string;
  imageUrl?: string;
  name: string;
  category: ICategory;
  description?: string;
}
