import IProduct from "./Product";
export default interface IShoppingList {
  readonly _id: string;
  name: string;
  status: "cancelled" | "completed" | "current";
  products: IShoppingListItem[];
  createdAt:string 
}

export interface IShoppingListItem extends IProduct {
  quantity: number;
  completed: boolean;
}
