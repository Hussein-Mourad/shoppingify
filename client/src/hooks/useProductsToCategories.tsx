import { tmpdir } from "os";
import { useState, useEffect } from "react";
import { ICategoryWithItems } from "types/Category";
import IProduct from "types/Product";
import { IShoppingListItem } from "types/ShoppingList";

export default function useProductsToCategories(products: IShoppingListItem[]) {
  const [categories, setCategories] = useState<ICategoryWithItems[]>([]);

  useEffect(() => {
    let tmp: ICategoryWithItems[] = [];

    products.forEach((product) => {
      let category = tmp.find(
        (category) => category.name === product.category.name
      );
      console.log("category", category);
      category && category.items.push(product);
      !category && tmp.push({ name: product.category.name, items: [product] });
    });

    setCategories([...tmp]);
    return () => {};
  }, [products]);

  console.log(categories);
  return categories;
}
