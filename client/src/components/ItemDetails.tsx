import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Image from "next/image";
import React from "react";
import Item from "types/Item";
import Button from "./shared/Button";

type Props = {
  className?: string;
  item: Item;
  onClose: () => void;
  onDelete: () => void;
  onAddToList: () => void;
};

function ItemDetails({
  className,
  item,
  onClose,
  onDelete,
  onAddToList,
}: Props) {
  const itemDataStyles = "mb-4 font-medium";
  const itemTitleStyles = "text-xs text-gray-500 mb-1";
  return (
    <div className={`${className} bg-white flex flex-col h-full w-full `}>
      <div className="flex-1 w-full px-5 overflow-auto sidedrawer-scrollbar">
        <div>
          <Button
            className="mt-4 text-sm text-yellow-500"
            onClick={onClose}
            leftIcon={
              <ArrowRightAltIcon className="rotate-180" fontSize="small" />
            }
          >
            back
          </Button>

          <div className="w-full my-8">
            <Image
              className="rounded-xl"
              src={"https://picsum.photos/200"}
              alt={item.name}
              width={500}
              height={500}
            />
          </div>
          <div>
            <div className={itemDataStyles}>
              <h2 className={itemTitleStyles}>name</h2>
              <p className="text-lg font-semibold">{item.name}</p>
            </div>
            <div className={itemDataStyles}>
              <h2 className={itemTitleStyles}>category</h2>
              <p>{item.category}</p>
            </div>
            <div className={itemDataStyles}>
              <h2 className={itemTitleStyles}>note</h2>
              <p>{item.note}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-24 px-5 bg-white sm:h-28">
        <Button
          className="px-5 py-3 mr-2 rounded-xl"
          onClick={onDelete}
          aria-label="modal cancel button"
          link
        >
          delete
        </Button>
        <Button
          className="px-5 py-3 text-white rounded-xl"
          color="orange"
          onClick={onAddToList}
          aria-label="modal confirm button"
        >
          Add to list
        </Button>
      </div>
    </div>
  );
}

export default ItemDetails;
