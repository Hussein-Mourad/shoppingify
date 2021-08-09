import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { useAppDispatch, useAppSelector } from "app/hooks";
import cn from "classnames";
import Button from "components/shared/Button";
import InputGroup from "components/shared/InputGroup";
import Image from "next/image";
import bottleImg from "public/img/bottle.svg";
import shoppingCartImg from "public/img/shopping.svg";
import { ReactNode, useState } from "react";

type ShoppingListProps = {};
type ShoppingListItem = {
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
};

type Category = { name: string; items: ShoppingListItem[] };

function ShoppingList(props: ShoppingListProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector();
   

  // initial={{ right: "-100vw", opacity: 0 }}
  // animate={{ right: 0, opacity: 1 }}
  // transition={{ duration: 0.3, ease: "linear", type: "tween" }}

  return (
    <div className="bg-[#FFF0DE] w-full h-full flex flex-col justify-between">
      <div className="flex flex-col h-full px-5 pt-10 overflow-auto sm:px-8 sidedrawer-scrollbar">
        <div className="bg-[#80485B] flex rounded-3xl w-full mx-auto p-3 sm:p-5  text-white font-bold text-lg">
          <div className="flex items-center justify-center w-1/3">
            <Image src={bottleImg} alt="bottle" width="80" height="150" />
          </div>
          <div className="mt-1 ml-5">
            <p className="block">Didn’t find what you need?</p>
            <Button
              className="px-6 py-2 mt-3 font-semibold bg-white text-trueGray-800 rounded-xl focus:ring focus:ring-gray-300 hover:bg-opacity-90 active:bg-gray-50"
              aria-label="add item button"
              onClick={(e) => alert("TODO")}
            >
              Add item
            </Button>
          </div>
        </div>
        {categories.length > 0 && (
          <div>
            <div className="my-6 text-2xl font-semibold text-trueGray-800">
              <div className="flex items-center justify-between">
                <h2>Shopping list</h2>
                <Button
                  className="w-12 h-12 rounded-full text-trueGray-700 sm:h-14 sm:w-14 hover:bg-trueGray-300/30 active:bg-trueGray-300/50"
                  aria-label="edit button"
                  onClick={toggleShowCheckBoxes}
                >
                  <EditIcon />
                </Button>
              </div>

              {categories.map((category, index) => (
                <Category key={category.name + index} name={category.name}>
                  {category.items.map((item, index) => (
                    <ShoppingList.Item
                      key={item.name + index}
                      item={item}
                      handleToggleCompleted={toggleItemCompleted}
                      handleAddQuantity={addItemQuantity}
                      handleReduceQuantity={reduceItemQuantity}
                      handleDelete={deleteItem}
                      checkBox={showCheckBoxes}
                    />
                  ))}
                </Category>
              ))}
            </div>
          </div>
        )}
        {categories.length === 0 && (
          <div className="relative flex flex-col items-center justify-center w-full h-full mt-6 text-xl font-semibold ">
            <p className="flex items-center justify-center h-1/2">No items</p>
            <div className="flex items-end justify-center w-full h-1/2">
              <Image
                src={shoppingCartImg}
                alt="shopping cart image"
                width="200"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full h-24 px-5 bg-white sm:h-28">
        {/* <Button
          className="px-5 py-3 mr-2 rounded-xl"
          onClick={() => {}}
          aria-label="modal cancel button"
          link
        >
          cancel
        </Button>
        <Button
          className="px-5 py-3 text-white rounded-xl"
          color="blue"
          onClick={() => {}}
          aria-label="modal confirm button"
        >
          Complete
        </Button> */}
        <form
          action=""
          autoComplete="off"
          className="flex-1 xs:m-2 sm:mx-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <InputGroup
            type="text"
            name="item-name"
            placeholder="Enter a name"
            className="border-2 border-yellow-500 caret-yellow-500 focus-within:border-yellow-600/75 hover:border-yellow-500/90"
            inputClassName="py-3"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            rightElement={
              <Button
                className="px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-500/90 focus:bg-yellow-600/75 active:bg-yellow-600/75 sm:px-8"
                onClick={() => {
                  // if (newItemName)
                  addItem({
                    name: newItemName,
                    quantity: 1,
                    category: "Fruits and vegetables",
                    completed: false,
                  });
                  setNewItemName("");
                }}
              >
                Save
              </Button>
            }
          />
        </form>
      </div>
    </div>
  );
}

type CategoryProps = {
  name: string;
  children: ReactNode;
};
function Category({ name, children }: CategoryProps) {
  return (
    <div className="my-4">
      <p className="text-sm text-trueGray-400">{name}</p>
      {children}
    </div>
  );
}

type ItemProps = {
  item: ShoppingListItem;
  checkBox: boolean;
  handleToggleCompleted: (item: ShoppingListItem) => void;
  handleAddQuantity: (item: ShoppingListItem) => void;
  handleReduceQuantity: (item: ShoppingListItem) => void;
  handleDelete: (item: ShoppingListItem) => void;
};

function Item({
  item,
  checkBox,
  handleToggleCompleted,
  handleAddQuantity,
  handleReduceQuantity,
  handleDelete,
}: ItemProps) {
  const [showControls, setShowControls] = useState(false);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const itemStyles = cn(
    "flex items-center justify-between my-2 text-lg font-semibold",
    { "py-0": !showControls }
  );

  return (
    <div className={itemStyles}>
      <div className="flex items-center ">
        {checkBox && (
          <input
            type="checkbox"
            name="done"
            id={`done-${item.name}`}
            checked={item.completed}
            onChange={() => handleToggleCompleted(item)}
            className="w-5 h-5 text-yellow-500 border-2 border-yellow-500 rounded shadow-sm focus:ring focus:ring-offset-0 focus:ring-yellow-200/70 focus:border-yellow-600"
          />
        )}

        {item.completed ? (
          <del className={cn("py-2", { "ml-5": checkBox })}>{item.name}</del>
        ) : (
          <p className={cn("py-2", { "ml-5": checkBox })}>{item.name}</p>
        )}
      </div>
      {showControls && (
        <div>
          <div className="flex items-center justify-center pr-2 text-yellow-500 bg-white w-max rounded-xl">
            <Button
              className="h-full p-2 text-white bg-yellow-500 hover:bg-yellow-500/90 active:bg-yellow-600/70 rounded-xl"
              onClick={(e) => handleDelete(item)}
            >
              <DeleteOutlineIcon />
            </Button>

            <button
              className="mx-1 text-2xl font-semibold disabled:text-yellow-400 disabled:cursor-not-allowed hover:text-opacity-50 focus:text-yellow-600/75"
              onClick={(e) => handleReduceQuantity(item)}
              disabled={item.quantity == 1}
            >
              &#65293;
            </button>
            <Button
              className="px-4 py-1 mx-1 text-sm text-yellow-500 border-2 border-yellow-500 rounded-3xl hover:bg-yellow-50 active:bg-yellow-100/50 hover:shadow-md focus:border-yellow-600 focus:ring focus:ring-yellow-200/70"
              onClick={toggleControls}
            >
              {item.quantity} pcs
            </Button>
            <button
              className="mx-1 text-2xl font-semibold hover:text-opacity-50 focus:text-yellow-600/75"
              onClick={() => handleAddQuantity(item)}
            >
              &#65291;
            </button>
          </div>
        </div>
      )}
      {!showControls && (
        <Button
          className="px-4 py-1 mx-1 text-sm text-yellow-500 border-2 border-yellow-500 rounded-3xl hover:bg-yellow-50 active:bg-yellow-100/50 hover:shadow-md focus:border-yellow-600 focus:ring focus:ring-yellow-200/70"
          onClick={toggleControls}
        >
          {item.quantity} pcs
        </Button>
      )}
    </div>
  );
}

export default ShoppingList;
ShoppingList.Item = Item;
