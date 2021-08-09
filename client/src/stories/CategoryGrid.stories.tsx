import { ComponentMeta, ComponentStory } from "@storybook/react";
import CategoryGrid from "components/CategoryGrid";
import React from "react";

export default {
  title: "Components/CategoryGrid",
  component: CategoryGrid,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof CategoryGrid>;

const Template: ComponentStory<typeof CategoryGrid> = (args) => (
  <div>
    <CategoryGrid {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: "Fruits and vegetables",
  className: "bg-gray-400",
};
