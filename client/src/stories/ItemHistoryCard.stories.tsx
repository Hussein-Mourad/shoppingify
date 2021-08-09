import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ItemHistoryCard from "../components/ItemHistoryCard";

export default {
  title: "Components/ItemHistoryCard",
  component: ItemHistoryCard,
  argTypes: {
    text: { control: "text" },
    quantity: { control: "number" },
  },
} as ComponentMeta<typeof ItemHistoryCard>;

const Template: ComponentStory<typeof ItemHistoryCard> = (args) => (
  <ItemHistoryCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Banana",
  quantity: 1,
};
