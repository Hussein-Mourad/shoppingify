import ShoppingListItem from "./ShoppingListItem";
import EditIcon from "@material-ui/icons/Edit";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Button from "components/shared/Button";
  import useProductsToCategories from "hooks/useProductsToCategories";
import Image from "next/image";
import bottleImg from "public/img/bottle.svg";
import shoppingCartImg from "public/img/shopping.svg";
import { ReactNode, useState } from "react";
import {
  selectShoppingList,
  incrementQuantity,
  decrementQuantity,
  toggleComplete,
  removeProduct,
} from "./shoppingListSlice";
import { setSideDrawerState } from "features/layouts/layoutSlice";
import { IShoppingListItem } from "types/ShoppingList";
import ShoppingListForm from "./ShoppingListForm";

function ShoppingList() {
  const dispatch = useAppDispatch();
  const shoppingList = useAppSelector(selectShoppingList);
  const [editList, setEditList] = useState(shoppingList.name === "");
  const categories = useProductsToCategories(shoppingList.products);

  const toggleEditList = () => {
    setEditList(!editList);
  };

  const shoppingListItems = ()=>{

  }

  return (
    <div className="bg-[#FFF0DE] w-full h-full flex flex-col justify-between">
      <div className="flex flex-col h-full px-4 overflow-auto pt-7 lg:px-6 sidedrawer-scrollbar">
        <div className="bg-[#80485B] flex rounded-3xl w-full mx-auto p-3 sm:p-4  text-white font-bold text-lg">
          <div className="flex items-center justify-center w-1/3">
            <Image src={bottleImg} alt="bottle" width="80" height="120" />
          </div>
          <div className="flex items-center mt-1 ml-5">
            <div>
              <p className="block">Didn’t find what you need?</p>
              <Button
                className="px-6 py-2 mt-3 font-semibold bg-white text-trueGray-800 rounded-xl focus:ring focus:ring-gray-300 hover:bg-opacity-90 active:bg-gray-50"
                aria-label="add item button"
                onClick={(e) =>
                  dispatch(
                    setSideDrawerState({
                      isSideDrawerOpen: true,
                      sideDrawerType: "addForm",
                    })
                  )
                }
              >
                Add item
              </Button>
            </div>
          </div>
        </div>

        {categories.length > 0 && (
          <div>
            <div className="my-4 text-2xl font-semibold text-trueGray-800">
              <div className="flex items-center justify-between h-12">
                <h2>Shopping list</h2>
                {shoppingList.name && (
                  <Button
                    className="w-12 h-12 rounded-full text-trueGray-700 sm:h-14 sm:w-14 hover:bg-trueGray-300/30 active:bg-trueGray-300/50"
                    aria-label="edit button"
                    onClick={toggleEditList}
                  >
                    <EditIcon />
                  </Button>
                )}
              </div>

              {categories.map((category, index) => (
                <Category key={category.name + index} name={category.name}>
                  {category.items.map((item, index) => (
                    <ShoppingListItem
                      key={item.name + index}
                      item={item as IShoppingListItem}
                      handleToggleCompleted={() =>
                        dispatch(toggleComplete(item))
                      }
                      handleAddQuantity={() =>
                        dispatch(incrementQuantity(item))
                      }
                      handleReduceQuantity={() =>
                        dispatch(decrementQuantity(item))
                      }
                      handleDelete={() => dispatch(removeProduct(item))}
                      checkBox={!editList}
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
      <div className="flex items-center justify-center w-full h-24 px-4 bg-white lg:px-6 sm:h-28">
        {editList && <ShoppingListForm setEditList={setEditList} />}
        {!editList && (
          <>
            <Button
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
            </Button>
          </>
        )}
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

export default ShoppingList;
