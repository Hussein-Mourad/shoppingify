import cn from "classnames";
import React from "react";
import SideBar from "components/SideBar";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { AppState } from "app/store";
import { toggleSideDrawer, setSideDrawerState } from "./layoutSlice";
import AddProductFrom from "features/products/AddProductForm";
import ShoppingList from "features/shoppingList/ShoppingList";
import Product from "features/products/Product";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const dispatch = useAppDispatch();
  const { isSideDrawerOpen, sideDrawerType } = useAppSelector(
    (state: AppState) => state.layout
  );

  const contentStyle = cn("ml-14 sm:ml-20 px-5 bg-gray-50", {
    "hidden md:block md:mr-80 lg:mr-96": isSideDrawerOpen,
  });

  const handleSideDrawer = () => {
    if (sideDrawerType === "shoppingList") {
      dispatch(toggleSideDrawer("shoppingList"));
    } else {
      dispatch(
        setSideDrawerState({
          isSideDrawerOpen: true,
          sideDrawerType: "shoppingList",
        })
      );
    }
  };


  return (
    <div className="w-full min-h-screen">
      <SideBar sideDrawerHandler={handleSideDrawer} />
      <main className={contentStyle}>{children}</main>
      {isSideDrawerOpen && (
        <aside className="relative h-screen shadow-lg md:right-0 md:fixed md:top-0 ml-14 sm:ml-20 md:ml-0">
          <div className="w-full h-full md:w-80 lg:w-96">
            {sideDrawerType === "shoppingList" ? (
              <ShoppingList />
            ) : sideDrawerType === "addForm" ? (
              <AddProductFrom />
            ) : (
              <Product
                onClose={() =>
                  dispatch(
                    setSideDrawerState({
                      isSideDrawerOpen: false,
                      sideDrawerType: "viewContent",
                    })
                  )
                }
              />
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
