import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Button from "../components/shared/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    children: { control: "text" },
    color: { control: "text" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Yes",
  className: "px-6 py-3 rounded-lg text-white",
  color: "orange",
};
