import Header from "components/Header";
import TwoSideBarsLayout from "features/layouts/TwoSideBarsLayout";
import ShoppingList from "features/shoppingList/ShoppingList";
import useAuthentication from "hooks/useAuthentication";
import { CircularProgress } from "@material-ui/core";
import ProductsList from "features/products/ProductsList";

export default function Home() {
  const { isLoading } = useAuthentication();

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );

  return (
    <TwoSideBarsLayout sideDrawer={<ShoppingList />}>
      <div className="min-h-screen p-2 sm:p-4 md:p-6">
        <Header />
        <ProductsList />
      </div>
    </TwoSideBarsLayout>
  );
}
