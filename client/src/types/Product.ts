import ICategory from "./Category";

export default interface IProduct {
  _id: string;
  imageUrl?: string;
  name: string;
  category: ICategory;
  description?: string;
}
