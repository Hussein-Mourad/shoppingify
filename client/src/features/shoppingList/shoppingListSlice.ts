import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "app/store";

export interface Item {
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
}

export interface Category {
  name: string;
  items: Item[];
}

const initialState: Category[] = [
  {
    name: "Fruits and vegetables",
    items: [
      {
        name: "Avocado",
        quantity: 1,
        category: "Fruits and vegetables",
        completed: false,
      },
    ],
  },
];

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
});

// export const getCategories = state;
export const selectCategories = (state: AppState) => state.shoppingList;

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

//   const addItem = (item: ShoppingListItem) => {
//     let category = categories.find(
//       (category) => category.name === item.category
//     );
//     if (category) {
//       category.items.push(item);
//     } else {
//       categories.push({ name: item.category, items: [item] });
//     }
//     setCategories([...categories]);
//   };

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
