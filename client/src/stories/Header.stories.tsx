import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "components/Header";
import React from "react";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header  />;

