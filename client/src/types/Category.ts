import IShoppingList, { IShoppingListItem } from "./ShoppingList";
import IProduct from "./Product"

export default interface ICategory {
  _id?: string;
  name: string;
}

export interface ICategoryWithItems<T> extends ICategory {
  items: T[];
}
