import { ReactElement } from "react";
import Card from "./shared/Card";

interface Props {
  text: string;
  quantity: number;
}

export default function ItemHistoryCard({
  text,
  quantity,
}: Props): ReactElement {
  return (
    <Card
      leftElements={text}
      rightElements={
        <p className="text-sm font-medium text-yellow-primary">
          {quantity} pcs
        </p>
      }
    ></Card>
  );
}
