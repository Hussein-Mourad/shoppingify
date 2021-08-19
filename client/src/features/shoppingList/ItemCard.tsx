import Add from "@material-ui/icons/Add";
import { useAppDispatch } from "app/hooks";
import Button from "components/shared/Button";
import Card from "components/shared/Card";
import React, { ReactElement } from "react";
import IProduct from "types/Product";
import { addProduct } from "./shoppingListSlice";

interface Props {
  item: IProduct;
}

export default function ItemCard({ item }: Props): ReactElement {
  const dispatch = useAppDispatch();

  return (
    <Card
      leftElements={
        <div className="flex-1 mr-4">
          <Button
            className="w-full h-full font-medium text-left break-all hover:text-yellow-primary active:text-yellow-600/90"
            onClick={() => {}}
            justify="start"
          >
            {item.name}
          </Button>
        </div>
      }
      rightElements={
        <div className="w-5">
          <Button
            className="w-full h-full hover:text-yellow-primary active:text-yellow-600/90 group"
            onClick={() => {
              dispatch(addProduct(item));
            }}
          >
            <Add className="font-medium text-gray-400 group-hover:text-yellow-primary" />
          </Button>
        </div>
      }
    />
  );
}
