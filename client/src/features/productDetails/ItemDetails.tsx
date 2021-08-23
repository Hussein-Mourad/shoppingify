import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Image from "next/image";
import React from "react";
import IProduct from "types/Product";
import Button from "components/shared/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addProduct } from "features/shoppingList/shoppingListSlice";
import { setSideDrawerState } from "features/layouts/layoutSlice";

type Props = {
  className?: string;
  onClose: () => void;
  onDelete: () => void;
  onAddToList: () => void;
};

function ItemDetails({ className, onClose, onDelete, onAddToList }: Props) {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.productDetails.product);

  const itemDataStyles = "mb-4 font-medium";
  const itemTitleStyles = "text-xs text-gray-500 mb-1";
  return (
    <div className={`${className} bg-white flex flex-col h-full w-full`}>
      <div className="flex-1 w-full px-5 overflow-auto sidedrawer-scrollbar">
        <div>
          <Button
            className="mt-4 mb-8 text-sm text-yellow-primary"
            onClick={onClose}
            leftIcon={
              <ArrowRightAltIcon className="rotate-180" fontSize="small" />
            }
          >
            back
          </Button>

          {product.imageUrl && (
            <div className="w-full mb-8">
              <Image
                className="rounded-xl"
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
              />
            </div>
          )}
          <div>
            <div className={itemDataStyles}>
              <h2 className={itemTitleStyles}>name</h2>
              <p className="text-lg font-semibold">{product.name}</p>
            </div>
            <div className={itemDataStyles}>
              <h2 className={itemTitleStyles}>category</h2>
              <p>{product.category.name}</p>
            </div>
            {product.description && (
              <div className={itemDataStyles}>
                <h2 className={itemTitleStyles}>note</h2>
                <p>{product.description}</p>
              </div>
            )}
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
          onClick={() => dispatch(addProduct(product))}
          aria-label="modal confirm button"
        >
          Add to list
        </Button>
      </div>
    </div>
  );
}

export default ItemDetails;
