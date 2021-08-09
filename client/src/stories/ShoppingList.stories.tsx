import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ShoppingList from '../features/shoppingList/ShoppingList';


export default {
  title: 'Components/ShoppingList',
  component: ShoppingList,
  argTypes: {
    number: { control: 'number' },
  },
} as ComponentMeta<typeof ShoppingList>;

const Template: ComponentStory<typeof ShoppingList> = (args) => (
  <ShoppingList {...args} />
  );

export const Default = Template.bind({});
