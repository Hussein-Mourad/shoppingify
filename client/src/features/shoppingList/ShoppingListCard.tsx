import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import EventNoteIcon from "@material-ui/icons/EventNote";
import cn from "classnames";
import Button from "components/shared/Button";
import Card from "components/shared/Card";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import IShoppingList from "types/ShoppingList";
import formatDate from "utils/formatDate";

interface Props {
  className?:string,
  shoppingList: IShoppingList;
}

export default function ShoppingListCard({
  className="",
  shoppingList,
}: Props): ReactElement {
  const router = useRouter();
  const labelStyles = cn(
    "inline-flex items-center justify-center px-2 py-1 mr-2 sm:mr-5 border rounded-lg text-sm ",
    {
      "border-lightBlue-400 text-lightBlue-400":
        shoppingList.status === "completed",
    },
    { "border-red-400 text-red-400": shoppingList.status === "cancelled" },
    { "border-green-400 text-green-400": shoppingList.status === "current" }
  );

  return (
    <button
      className={`${className} w-full text-left rounded-xl`}
      onClick={(e) => router.push("/history/" + shoppingList._id)}
    >
      <Card
        className="items-center justify-between w-full"
        leftElements={
          <div className="flex-1">
            <p>{shoppingList.name}</p>
          </div>
        }
        rightElements={
          <div className="flex items-center justify-end">
            <div className="items-center hidden mr-2 text-sm text-gray-400 xs:flex sm:mr-5">
              <EventNoteIcon fontSize="small" />
              <p className="ml-2 font-semibold">
                {formatDate(new Date(shoppingList.createdAt))}
              </p>
            </div>
            <div className={labelStyles}>{shoppingList.status}</div>
            <span
              className="p-1 rounded-md text-yellow-primary hover:text-yellow-600/80 active:text-yellow-600 focus:text-yellow-600/80 focus:ring-2 focus:ring-yellow-600/80"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </span>
          </div>
        }
      />
    </button>
  );
}
