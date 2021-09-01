import { ReactElement, useEffect } from "react";
import TwoSideBarsLayout from "features/layouts/TwoSideBarsLayout";
import useAuthentication from "hooks/useAuthentication";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import IShoppingList from "types/ShoppingList";
import Button from "components/shared/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ShoppingListDetails from "features/shoppingList/ShoppingListDetails";

export default function ShoppingList(): ReactElement {
  const router = useRouter();
  const [shoppingList, setShoppingList] = useState<IShoppingList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoading } = useAuthentication();

  useEffect(() => {
    const { id } = router.query;

    (async () => {
      try {
        const response = await axios.get("/api/shoppinglist/" + id);
        setShoppingList(response.data.shoppingList);
      } catch (error) {
        setError("Item not found.");
      }
    })();

    return () => {};
  });

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );
  }

  return (
    <TwoSideBarsLayout>
      <div className="flex flex-col h-full min-h-screen p:2 sm:p-4 md:p-6">
        <div>
          <Button
            className="mt-4 mb-8 text-sm text-yellow-primary"
            onClick={() => {
              router.push("/history");
            }}
            leftIcon={
              <ArrowRightAltIcon className="rotate-180" fontSize="small" />
            }
          >
            back
          </Button>
        </div>

        {shoppingList && <ShoppingListDetails shoppingList={shoppingList}/>}

        {error && (
          <div className="flex items-center justify-center flex-1 w-full h-full text-lg text-red-500">
            {error}
          </div>
        )}
      </div>
    </TwoSideBarsLayout>
  );
}
