import { ReactElement } from "react";
import Card from "components/shared/Card";
import IProduct from "types/Product";
import { IShoppingListItem } from "types/ShoppingList";
import Button from "components/shared/Button";
import { useAppDispatch } from "app/hooks";
import { showProductDetails } from "features/products/productsSlice";

interface Props {
  className?: string;
  product: IShoppingListItem;
}

export default function ShoppingListItemCard({
  className = "",
  product,
}: Props): ReactElement {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="rounded-xl"
      onClick={(e) => {
        dispatch(showProductDetails(product));
      }}
    >
      <Card
        className={`${className} items-center justify-between w-full`}
        leftElements={product.name}
        rightElements={
          <p className="text-sm font-medium text-yellow-primary">
            {product.quantity} pcs
          </p>
        }
      />
    </Button>
  );
}
