import type { Meta, StoryObj } from '@storybook/react';
import ContactForm from '@/pages/ContactForm/ContactForm';

const meta = {
  title: 'Plain HTML5/ContactForm (Zod Validation)',
  component: ContactForm,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
