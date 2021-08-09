import { Search } from "@material-ui/icons/";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import InputGroup from "components/InputGroup";
import React from "react";

export default {
  title: "Components/InputGroup",
  component: InputGroup,
  argTypes: {
    number: { control: "number" },
  },
} as ComponentMeta<typeof InputGroup>;

const Template: ComponentStory<typeof InputGroup> = (args) => (
  <div>
    <InputGroup {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  leftElement: <Search className="mx-2" />,
  inputClassName: "py-5",
  label:"Name"
};
