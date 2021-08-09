touch ./src/components/$1.tsx ./src/stories/$1.stories.tsx


echo "import  { ReactElement } from 'react'

interface Props {
  
}

export default function $1({}: Props): ReactElement {
  return (
    <div>
      
    </div>
  )
}
">./src/components/$1.tsx 

echo "import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import $1 from '../components/$1';

export default {
  title: 'Components/$1',
  component: $1,
  argTypes: {
    number: { control: 'number' },
  },
} as ComponentMeta<typeof $1>;

const Template: ComponentStory<typeof $1> = (args) => (
  <$1 {...args} />
  );

export const Default = Template.bind({});
Default.args = {
  number:0
};
">./src/stories/$1.stories.tsx