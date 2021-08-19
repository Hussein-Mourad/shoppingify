import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "app/store";
import IShoppingList, { IShoppingListItem } from "types/ShoppingList"; 
import IProduct from "types/Product";

const initialState: IShoppingList = {
  name: "",
  status: "current",
  products: [],
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    changeName: (state: IShoppingList, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addProduct:(state:IShoppingList, action:PayloadAction<IShoppingListItem>)=>{
      state.products.push(action.payload);
    },
    removeProduct:(state:IShoppingList, action:PayloadAction<IShoppingListItem>)=>{
      state.products.filter(product=>product.name===action.payload.name);
    }
  },
});

export const selectShoppingList = (state: AppState) => state.shoppingList;

export const { changeName, addProduct, removeProduct } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;

// const [showCheckBoxes, setShowCheckBoxes] = useState(false);
//   const [newItemName, setNewItemName] = useState("");
//   const [categories, setCategories] = useState<Category[]>([
//     {
//       name: "Fruits and vegetables",
//       items: [
//         {
//           name: "Avocado",
//           quantity: 1,
//           category: "Fruits and vegetables",
//           completed: false,
//         },
//         {
//           name: "Pre-cooked corn 450g",
//           quantity: 4,
//           category: "Fruits and vegetables",
//           completed: false,
//         },
//       ],
//     },
//     {
//       name: "Beverages",
//       items: [
//         { name: "Water", quantity: 3, category: "Beverages", completed: false },
//         { name: "Cola", quantity: 8, category: "Beverages", completed: false },
//       ],
//     },
//   ]);

//   const addItemQuantity = (item: ShoppingListItem) => {
//     let category = categories.find(
//       (category) => category.name === item.category
//     );
//     if (category) {
//       let categoryItem = category.items.find(
//         (categoryItem) => categoryItem.name == item.name
//       );
//       if (categoryItem) categoryItem.quantity++;
//     }
//     setCategories([...categories]);
//   };

//   const reduceItemQuantity = (item: ShoppingListItem) => {
//     let category = categories.find(
//       (category) => category.name === item.category
//     );
//     if (category) {
//       let categoryItem = category.items.find(
//         (categoryItem) => categoryItem.name == item.name
//       );
//       if (categoryItem) Math.max(item.quantity--, 1);
//     }
//     setCategories([...categories]);
//   };

//   const deleteItem = (item: ShoppingListItem) => {
//     let category = categories.find(
//       (category) => category.name === item.category
//     );
//     if (category) {
//       category.items.splice(category.items.indexOf(item), 1);
//     }
//     setCategories(categories.filter((category) => category.items.length > 0));
//   };
;

//   const toggleItemCompleted = (item: ShoppingListItem) => {
//     let category = categories.find(
//       (category) => category.name === item.category
//     );
//     if (category) {
//       let categoryItem = category.items.find(
//         (categoryItem) => categoryItem.name == item.name
//       );
//       if (categoryItem) item.completed = !item.completed;
//     }
//     setCategories([...categories]);
//   };

//   const toggleShowCheckBoxes = () => {
//     setShowCheckBoxes(!showCheckBoxes);
//   };
