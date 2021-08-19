import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import EventNoteIcon from "@material-ui/icons/EventNote";
import cn from "classnames";
import Button from "components/shared/Button";
import Card from "components/shared/Card";
import { ReactElement } from "react";
import formatDate from "utils/formatDate";


interface Props {
  text: string;
  listState: "completed" | "canceled";
  date: Date;
}

export default function ShoppingListCard({
  listState,
  text,
  date,
}: Props): ReactElement {
  const labelStyles = cn(
    "inline-flex items-center justify-center px-2 py-1 mr-2 sm:mr-5 border rounded-lg",
    {
      "border-lightBlue-400 text-lightBlue-400": listState === "completed",
    },
    { "border-red-400 text-red-400": listState === "canceled" }
  );

  return (
    <>
      <Card leftElements={text} />
      <div className="flex items-center justify-between p-5 bg-white shadow rounded-xl">
        <div className="flex-1">
          <p>{text}</p>
          <div className="flex items-center mt-2 text-gray-400 xs:hidden">
            <EventNoteIcon />
            <p className="ml-1 text-sm font-semibold">{formatDate(date)}</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="items-center hidden mr-2 text-gray-400 xs:flex sm:mr-5">
            <EventNoteIcon />
            <p className="ml-1 text-sm font-semibold sm:ml-3">
              {formatDate(date)}
            </p>
          </div>
          <div className={labelStyles}>{listState}</div>
          <Button
            className="p-1 rounded-md text-yellow-primary hover:text-yellow-600/80 active:text-yellow-600 focus:text-yellow-600/80 focus:ring-2 focus:ring-yellow-600/80"
            onClick={(e) => {}}
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
