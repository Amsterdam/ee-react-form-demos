import type { Meta, StoryObj } from '@storybook/react';
import BookingForm from '@/pages/BookingForm/BookingForm';

const meta = {
  title: 'Plain HTML5/BookingForm',
  component: BookingForm,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof BookingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
