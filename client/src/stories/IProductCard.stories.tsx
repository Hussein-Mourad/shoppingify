import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProductCard from "features/products/ProductCard";
import React from "react";

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <div>
    <ProductCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
};
