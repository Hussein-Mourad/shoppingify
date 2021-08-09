import React, { ReactElement, ReactNode } from "react";
import ItemCard from "../features/shoppingList/ItemCard";

interface Props {
  name: string;
  className?: string;
  children?: ReactNode;
}

export default function CategoryGrid({
  name,
  className,
  children,

}: Props): ReactElement {
  const strings = [
    "Banana",
    "Avocado",
    "Pre-cooked meat",
    "Eggs",
    "bde3cef1c7f7361c39d191d3f8f7ac9b3a4c7077290ca478d93869a4b188",
    "Banana",
    "Avocado",
    "Lorem ipsum dolor sit, amet conse ctetur adipisicing elit. In voluptate beatae deserunt molestiae optio velit, architecto cumque voluptates. Aliquid consectetur sed maxime nemo autem amet accusantium nulla cum tempore dolor!",
    "Pre-cooked meat",
    "Eggs",
    "bde3cef1 c7f7361c3 9d 191d3f8f7ac9b3a  4c707729 0c a478d 93869 a4b188",
    "bde3cef 1c7f7361 39d191d3f8 f7ac9b 3a4c707729 0ca478d9 3869a 4b188",
    "Pre-cooked meat",
    "Eggs",
  ];
  return (
    <div className={className}>
      <h3 className="text-lg font-medium">{name}</h3>
      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4">
        {children}
        {/* {strings.map((str, index) => (
          <div key={index}>
            <ItemCard
              text={str}
              onAddBtnClick={() => {}}
              onItemBtnClick={() => {}}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}
