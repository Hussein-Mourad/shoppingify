import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import IShoppingList from "types/ShoppingList";
import { CircularProgress } from "@material-ui/core";
import ShoppingListCard from "./ShoppingListCard";
import useGroupByDate from "hooks/useGroupByDate";

interface Props {}

export default function ShoppingLists({}: Props): ReactElement {
  const [shoppingLists, setShoppingLists] = useState<IShoppingList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const shoppingListsGroupedByDate = useGroupByDate(shoppingLists);
 
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("api/shoppinglists/");
        setShoppingLists(response.data.shoppingLists);
      } catch (error) {
        setError("Couldn't find items.");
      }
      setIsLoading(false);
    })();

    return () => {};
  }, []);

  if (isLoading)
    return (
      <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-white">
        <CircularProgress classes={{ circle: "text-yellow-primary" }} />
      </div>
    );

  if (shoppingListsGroupedByDate.length == 0) {
  return (
    <div className="flex items-center justify-center w-full h-72 text-red-500/90">
      No data found.
    </div>
  );
  }

  return (
    <div>
      {shoppingListsGroupedByDate &&
        shoppingListsGroupedByDate.map((group) => (
          <div key={group.date.toString()} className="mt-8 mb-6">
            <h2 className="my-3 text-sm font-medium">
              {months[group.date.getMonth()] + " " + group.date.getFullYear()}
            </h2>
            {group.shoppingLists.map((shoppingList) => (
              <ShoppingListCard
                className="mb-3"
                key={shoppingList._id}
                shoppingList={shoppingList}
              />
            ))}
          </div>
        ))}
    </div>
  );
}
