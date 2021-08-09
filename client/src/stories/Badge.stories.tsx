import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from '../components/shared/Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    number: { control: 'number' },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <div className="w-20 h-20 bg-blue-500"><Badge {...args} /></div>
  );

export const Zero = Template.bind({});
Zero.args = {
  number:0
};

export const SingleDigitNumber = Template.bind({});
SingleDigitNumber.args = {
  number: 5,
};

export const TwoDigitNumber = Template.bind({});
TwoDigitNumber.args = {
  number:10,
};

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = {
  number: 100,
};
