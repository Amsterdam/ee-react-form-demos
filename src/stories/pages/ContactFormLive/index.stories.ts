import type { Meta, StoryObj } from '@storybook/react';
import ContactFormLive from '@/pages/ContactFormLive/ContactFormLive';

const meta = {
  title: 'Plain HTML5/ContactForm (on Change; Zod Validation)',
  component: ContactFormLive,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof ContactFormLive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
