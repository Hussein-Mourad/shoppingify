import { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { fetchProducts } from "./productsSlice";
import ProductCard from "./ProductCard";
import CategoryGrid from "components/CategoryGrid";
import IProduct from "types/Product";
import { useRouter } from "next/router";
import { ICategoryWithItems } from "types/Category";

interface Props {}

export default function ProductsList({}: Props): ReactElement {
  const router = useRouter();
  const [filterTerm, setFilterTerm] = useState("");
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);
  const products = useAppSelector((state) =>
    state.products.products.filter(
      (product) =>
        product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        product.category.name.toLowerCase().includes(filterTerm.toLowerCase())
    )
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
      !category && tmp.push({ _id: product.category._id,name: product.category.name, items: [product] });
    });

    setCategories([...tmp]);
    return () => {};
  }, [productStatus, filterTerm]);

  useEffect(() => {
    setFilterTerm((router.query.name as string) ?? "");
  }, [router.query]);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus]);

  categories.forEach(category=>{
    console.log("🚀 ~ file: ProductsList.tsx ~ line 56 ~ ProductsList ~ category", category)
  })
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
