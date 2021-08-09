import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AddItemForm from "../components/AddItemForm";

export default {
  title: "Components/AddItemForm",
  component: AddItemForm,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
);

export const Default = Template.bind({});
