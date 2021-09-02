import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Progress from "../components/shared/Progress";

export default {
  title: "Components/Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Banana",
  percentage: 30,
  progressColor: "bg-yellow-primary",
};
