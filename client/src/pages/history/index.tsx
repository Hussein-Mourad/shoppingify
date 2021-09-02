import TwoSideBarsLayout from "features/layouts/TwoSideBarsLayout";
import useAuthentication from "hooks/useAuthentication";
import { CircularProgress } from "@material-ui/core";
import ShoppingLists from "features/shoppingList/ShoppingLists";

export default function Home() {
  const { user, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );
  }

  return (
    <TwoSideBarsLayout>
      <div className="min-h-screen p-2 sm:p-4 md:p-6">
        <h1 className="mb-3 text-2xl font-semibold sm:mb-5 text-trueGray-700">
          Shopping history
        </h1>
          <ShoppingLists />
      </div>
    </TwoSideBarsLayout>
  );
}
