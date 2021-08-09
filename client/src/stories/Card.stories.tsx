import { Add } from "@material-ui/icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "components/shared/Button";
import React from "react";
import Card from "../components/shared/Card";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftElements: "This is a card with add button",
  rightElements: (
    <Button onClick={() => {}}>
      <Add className="font-medium text-gray-400" />
    </Button>
  ),
};
