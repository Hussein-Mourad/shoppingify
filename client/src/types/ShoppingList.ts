import IProduct from "./Product";
export default interface IShoppingList {
  _id?: string;
  name: string;
  status: "cancelled" | "completed" | "current";
  products: IShoppingListItem[];
}

export interface IShoppingListItem extends IProduct {
  quantity: Number;
  completed: boolean;
}
