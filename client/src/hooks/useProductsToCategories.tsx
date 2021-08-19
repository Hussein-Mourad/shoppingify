import { useState, useEffect } from "react";
import { ICategoryWithItems } from "types/Category";
import IProduct from "types/Product";
import { IShoppingListItem } from "types/ShoppingList";

export default function useProductsToCategories(
  products: IShoppingListItem[] | IProduct[]
) {
  const [categories, setCategories] = useState<ICategoryWithItems[]>([]);

  useEffect(() => {
    products.forEach((product) => {
      let category = categories.find(
        (category) => category.name === product.category.name
      );
      if (category) {
        category.items.push(product);
      } else {
        categories.push({ name: product.category.name, items: [product] });
      }
      setCategories([...categories]);
    });
    return () => {};
  }, [products]);

  return categories;
}
