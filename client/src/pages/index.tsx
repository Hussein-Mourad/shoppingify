import CategoryGrid from "components/CategoryGrid";
import Header from "components/Header";
import TwoSideBarsLayout from "features/layouts/TwoSideBarsLayout";
import ItemCard from "features/shoppingList/ItemCard";
import ShoppingList from "features/shoppingList/ShoppingList";
import Head from "next/head";
import IProduct from "types/Product";
import { useEffect, useState } from "react";
import useProductsToCategories from "hooks/useProductsToCategories";
import { IShoppingListItem } from "types/ShoppingList";
import useAuthentication from "hooks/useAuthentication";
import { CircularProgress } from "@material-ui/core";

export default function Home() {
  const { user, isLoading } = useAuthentication();
  const [products, setProducts] = useState<IShoppingListItem[]>([]);
  const categories = useProductsToCategories(products);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products/");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {}
    })(); 
    return () => {};
  }, []);

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );

  return (
    <div className="">
      <TwoSideBarsLayout sideDrawer={<ShoppingList />}>
        <div className="min-h-screen p-2 sm:p-4 md:p-6">
          <Header />
          <div className="mt-4 sm:mt-6 md:mt-8">
            {categories.map((category) => (
              <CategoryGrid key={category._id} name={category.name}>
                {category.items.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </CategoryGrid>
            ))}
          </div>
        </div>
      </TwoSideBarsLayout>
    </div>
  );
}
