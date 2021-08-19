import IProduct from "./Product";
import { IShoppingListItem } from "./ShoppingList";

export default interface ICategory {
  _id?: string;
  name: string;
}

export interface ICategoryWithItems extends ICategory {
  items: IProduct[];
}
