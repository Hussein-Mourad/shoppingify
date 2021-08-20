import IProduct from "./Product";
export default interface IShoppingList {
  _id?: string;
  name: string;
  status: "cancelled" | "completed" | "current";
  products: IShoppingListItem[];
  isOpen?: boolean;
}

export interface IShoppingListItem extends IProduct {
  quantity: number;
  completed: boolean;
}
