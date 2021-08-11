import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Grid from '../components/shared/Grid';

export default {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    number: { control: 'number' },
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args} />
  );

export const Default = Template.bind({});
Default.args = {
  number:0
};

