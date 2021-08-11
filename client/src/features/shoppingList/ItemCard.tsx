import Add from "@material-ui/icons/Add";
import Button from "components/shared/Button";
import Card from "components/shared/Card";
import React, { ReactElement } from "react";

interface Props {
  text: string;
  onAddBtnClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onItemBtnClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function ItemCard({
  text,
  onItemBtnClick,
  onAddBtnClick,
}: Props): ReactElement {
  return (
    <Card
      leftElements={
        <div className="flex-1 mr-4">
          <Button
            className="w-full h-full font-medium text-left break-all hover:text-yellow-primary active:text-yellow-600/90"
            onClick={onItemBtnClick}
            justify="start"
          >
            dgjdfgkldfjglkdfjgdfklgjdfgklfgjsdfklgjlfkgjlsfdgkjfgljdfglfkdjl
            {text}
          </Button>
        </div>
      }
      rightElements={
        <div className="w-5">
          <Button
            className="w-full h-full hover:text-yellow-primary active:text-yellow-600/90 group"
            onClick={onAddBtnClick}
          >
            <Add className="font-medium text-gray-400 group-hover:text-yellow-primary" />
          </Button>
        </div>
      }
    />
  );
}
