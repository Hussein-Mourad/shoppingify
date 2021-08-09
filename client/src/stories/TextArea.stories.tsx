import { ComponentMeta, ComponentStory } from "@storybook/react";
import TextAreaGroup from "components/shared/TextAreaGroup";
import React from "react";

export default {
  title: "Components/TextAreaGroup",
  component: TextAreaGroup,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof TextAreaGroup>;

const Template: ComponentStory<typeof TextAreaGroup> = (args) => (
  <div>
    <TextAreaGroup {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Name",
  error: "Required",
  maxLength: 500,
  cols: 30,
  rows: 10,
};
