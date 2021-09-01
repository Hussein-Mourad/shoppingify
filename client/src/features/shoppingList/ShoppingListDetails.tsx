import { ReactElement } from "react";
import IShoppingList from "types/ShoppingList";
import EventNoteIcon from "@material-ui/icons/EventNote";
import formatDate from "utils/formatDate";
import useProductsToCategories from "hooks/useProductsToCategories";
import CategoryGrid from "../products/CategoryGrid";
import ShoppingListItemCard from "./ShoppingListItemCard";

interface Props {
  className?: string;
  shoppingList: IShoppingList;
}

export default function ShoppingListDetails({
  className = "",
  shoppingList,
}: Props): ReactElement {
  const categories = useProductsToCategories(shoppingList.products);
  
  return (
    <div className={`${className} `}>
      <h1 className="text-xl font-bold text-trueGray-800">
        {shoppingList.name}
      </h1>
      <div className="flex items-center mt-3 text-sm text-gray-400">
        <EventNoteIcon fontSize="small" />
        <p className="ml-2 font-semibold">
          {formatDate(new Date(shoppingList.createdAt))}
        </p>
      </div>
      <div className="mt-8">
        {categories.map((category) => (
          <CategoryGrid key={category._id} name={category.name}>
            {category.items.map((product) => (
              <ShoppingListItemCard key={product._id} product={product} />
            ))}
          </CategoryGrid>
        ))}
      </div>
    </div>
  );
}
