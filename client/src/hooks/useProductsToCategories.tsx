import { useState, useEffect } from "react";
import { ICategoryWithItems } from "types/Category";



export default function useProductsToCategories<T>(products: T[], dependency?: Array<any>) {
  const [categories, setCategories] = useState<ICategoryWithItems<T>[]>([]);

  useEffect(() => {
    let tmp: ICategoryWithItems<T>[] = [];

    products.forEach((product: any) => {
      let category = tmp.find(
        (category) => category.name === product.category.name
      );
      category && category.items.push(product);
      !category && tmp.push({ name: product.category.name, items: [product] });
    });

    setCategories([...tmp]);
    return () => {};
  }, [dependency||products]);

  return categories;
}
