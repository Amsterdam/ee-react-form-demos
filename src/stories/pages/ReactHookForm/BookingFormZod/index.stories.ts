import type { Meta, StoryObj } from '@storybook/react';
import BookingFormZod from '@/pages/ReactHookForm/BookingFormZod/BookingFormZod';

const meta = {
  title: 'ReactHookForm/BookingFormZod',
  component: BookingFormZod,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof BookingFormZod>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
