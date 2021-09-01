import { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { fetchProducts, selectFilterdProducts } from "./productsSlice";
import ProductCard from "./ProductCard";
import CategoryGrid from "./CategoryGrid";
import IProduct from "types/Product";
import { useRouter } from "next/router";
import { ICategoryWithItems } from "types/Category";

interface Props {}

export default function ProductsList({}: Props): ReactElement {
  const router = useRouter();
  const [filterTerm, setFilterTerm] = useState(
    (router.query.filter as string) || ""
  );
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);
  const products = useAppSelector((state) =>
    selectFilterdProducts(state, filterTerm)
  );
  const [categories, setCategories] = useState<ICategoryWithItems<IProduct>[]>(
    []
  );

  
  useEffect(() => {
    let tmp: ICategoryWithItems<IProduct>[] = [];

    products.forEach((product: any) => {
      let category = tmp.find(
        (category) => category.name === product.category.name
      );
      category && category.items.push(product);
      !category &&
        tmp.push({
          ...product.category,
          items: [product],
        });
    });
    tmp.sort((a, b) => a.name.localeCompare(b.name));
    setCategories([...tmp]);
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStatus, filterTerm, dispatch]);

  useEffect(() => {
    setFilterTerm((router.query.filter as string) ?? "");
  }, [router.query]);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      {categories.map((category) => (
        <CategoryGrid key={category._id} name={category.name}>
          {category.items.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </CategoryGrid>
      ))}
    </div>
  );
}
