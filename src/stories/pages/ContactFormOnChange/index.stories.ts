import type { Meta, StoryObj } from '@storybook/react';
import ContactFormOnChange from '@/pages/ContactFormOnChange/ContactFormOnChange';

const meta = {
  title: 'Plain HTML5/ContactForm (on Change; Zod Validation)',
  component: ContactFormOnChange,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof ContactFormOnChange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
