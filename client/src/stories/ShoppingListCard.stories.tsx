import { ComponentMeta, ComponentStory } from "@storybook/react";
import ShoppingListCard from "features/shoppingList/ShoppingListCard";
import React from "react";

export default {
  title: "Components/ShoppingListCard",
  component: ShoppingListCard,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof ShoppingListCard>;

const Template: ComponentStory<typeof ShoppingListCard> = (args) => (
  <div>
    <ShoppingListCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text: "klsdgjsdgksdgjk",
  date: new Date(),
  listState: "canceled",
};
