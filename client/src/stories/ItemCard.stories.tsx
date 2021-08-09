import { ComponentMeta, ComponentStory } from "@storybook/react";
import ItemCard from "features/shoppingList/ItemCard";
import React from "react";

export default {
  title: "Components/ItemCard",
  component: ItemCard,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof ItemCard>;

const Template: ComponentStory<typeof ItemCard> = (args) => (
  <div>
    <ItemCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident inventore ut, libero, reiciendis odio magnam quo expedita veniam voluptatum ipsum consequatur nihil earum, assumenda quaerat ex dolore corrupti voluptas perferendis.",
};
