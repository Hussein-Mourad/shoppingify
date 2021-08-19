import ICategory from "./Category";

export default interface IProduct {
  _id?: string;
  url?: URL | string;
  name: string;
  category: ICategory;
  note?: string;
}
