import { ReactElement, useState } from "react";
import { IShoppingListItem } from "types/ShoppingList";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import cn from "classnames";
import Button from "components/shared/Button";

interface Props {
  item: IShoppingListItem;
  checkBox: boolean;
  handleToggleCompleted: (item: IShoppingListItem) => void;
  handleAddQuantity: (item: IShoppingListItem) => void;
  handleReduceQuantity: (item: IShoppingListItem) => void;
  handleDelete: (item: IShoppingListItem) => void;
}

export default function ShoppingListItem({
  item,
  checkBox,
  handleToggleCompleted,
  handleAddQuantity,
  handleReduceQuantity,
  handleDelete,
}: Props): ReactElement {
  return (
    <div>
      <div className="flex items-center justify-between my-2 text-lg font-semibold">
        <div className="flex items-center ">
          {checkBox && (
            <input
              type="checkbox"
              name="done"
              id={`done-${item.name}`}
              checked={item.completed}
              onChange={() => handleToggleCompleted(item)}
              className="w-5 h-5 border-2 rounded shadow-sm border-yellow-primary text-yellow-primary focus:ring focus:ring-offset-0 focus:ring-yellow-200/70 focus:border-yellow-600"
            />
          )}

          {item.completed ? (
            <del className={cn("py-2", { "ml-5": checkBox })}>{item.name}</del>
          ) : (
            <p className={cn("py-2", { "ml-5": checkBox })}>{item.name}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-center pr-2 hover:bg-white text-yellow-primary w-max rounded-xl group focus-within:bg-white">
            <Button
              className="hidden h-full p-2 text-white bg-yellow-primary hover:bg-yellow-primary/90 active:bg-yellow-600/70 rounded-xl group-hover:block group-focus-within:block"
              onClick={(e) => handleDelete(item)}
            >
              <DeleteOutlineIcon />
            </Button>

            <button
              className="hidden mx-1 text-2xl font-semibold disabled:text-yellow-400 disabled:cursor-not-allowed hover:text-opacity-50 focus:text-yellow-600/75 group-hover:block group-focus-within:block"
              onClick={(e) => handleReduceQuantity(item)}
              disabled={item.quantity == 1}
            >
              &#65293;
            </button>
            <Button
              className="px-4 py-1 mx-1 text-sm border-2 border-yellow-primary text-yellow-primary rounded-3xl hover:bg-yellow-50 active:bg-yellow-100/50 hover:shadow-md focus:border-yellow-600 focus:ring focus:ring-yellow-200/70 "
              onClick={() => {}}
            >
              {item.quantity} pcs
            </Button>
            <button
              className="hidden mx-1 text-2xl font-semibold hover:text-opacity-50 focus:text-yellow-600/75 group-hover:block group-focus-within:block"
              onClick={() => handleAddQuantity(item)}
            >
              &#65291;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
