import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Product from "../features/products/Product";

export default {
  title: "Components/ItemDetails",
  component: Product,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => (
    <Product {...args} />
);

export const Default = Template.bind({});
Default.args = {
  className: "",
  item: {
    name: "Avocado",
    category: "Fruit and vegetables",
    note:
      "Nutrient-dense foods are those that provide substantial amounts of vitamins, minerals and other nutrients with relatively few calories. One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 vitamins and minerals, making it a great nutrient-dense food choice.",
  },
};

// export const SingleDigitNumber = Template.bind({});
// SingleDigitNumber.args = {
//   number: 5,
// };

// export const TwoDigitNumber = Template.bind({});
// TwoDigitNumber.args = {
//   number:10,
// };

// export const ThreeDigitNumber = Template.bind({});
// ThreeDigitNumber.args = {
//   number: 100,
// };
