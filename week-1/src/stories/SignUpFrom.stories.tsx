import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from '../components/sign-up-form';
import { ERROR_MSG } from '../hooks/use-sign-up';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/SignUpForm',
  render: () => {
    return (
      <SignUpForm
        errorText={{ errorEmailText: '', errorPasswordText: '' }}
        onSubmit={() => null}
        initFormState={() => null}
      />
    );
  },
  component: SignUpForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const _SignUpForm: Story = {
  args: {
    errorText: {
      errorEmailText: ERROR_MSG.email,
      errorPasswordText: ERROR_MSG.password,
    },
    onSubmit: () => null,
    initFormState: () => null,
  },
};
