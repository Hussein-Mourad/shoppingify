import { ReactElement, SetStateAction } from "react";
import InputGroup from "components/shared/InputGroup";
import Button from "components/shared/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { changeName } from "./shoppingListSlice";
import { useState, Dispatch } from "react";
import cn from "classnames";

interface Props {
  setEditList: Dispatch<SetStateAction<boolean>>;
}

export default function ShoppingListForm({ setEditList }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.shoppingList.name);
  const [value, setValue] = useState(name);

  const inputStyle = cn(
    "border-2",
    {
      "border-yellow-primary caret-yellow-primary focus-within:border-yellow-600/75 hover:border-yellow-primary/90 focus-visible:border-black/90": value,
    },
    { "border-gray-300": !value }
  );
  return (
    <form
      autoComplete="off"
      className="flex-1"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputGroup
        type="text"
        name="item-name"
        placeholder="Enter a name"
        className={inputStyle}
        inputClassName="py-2 sm:py-3"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rightElement={
          <Button
            className="px-4 py-2 text-lg font-bold text-white rounded-lg sm:px-6 sm:py-3 bg-yellow-primary hover:bg-yellow-primary/90 focus:bg-yellow-600/75 active:bg-yellow-600/80"
            onClick={() => {
              dispatch(changeName(value));
              setEditList(false);
            }}
            disabled={value === ""}
          >
            Save
          </Button>
        }
      />
    </form>
  );
}
