import { ComponentMeta, ComponentStory } from "@storybook/react";
import SelectGroup from "components/shared/SelectGroup";
import React from "react";

export default {
  title: "Components/SelectGroup",
  component: SelectGroup,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof SelectGroup>;

const Template: ComponentStory<typeof SelectGroup> = (args) => (
  <div>
    <SelectGroup {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Category",
  options: ["Fruits and vegetables", "Beverages"],
};
