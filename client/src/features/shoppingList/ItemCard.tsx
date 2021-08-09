import Add from "@material-ui/icons/Add";
import React, { ReactElement } from "react";
import Button from "components/shared/Button";
import Card from "components/shared/Card";

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
        <Button
          className="w-full h-full font-medium text-left break-all"
          onClick={onItemBtnClick}
          justify="start"
        >
          {text}
        </Button>
      }
      rightElements={
        <Button className="w-full h-full " onClick={onAddBtnClick}>
          <Add className="font-medium text-gray-400" />
        </Button>
      }
    />
  );
}
