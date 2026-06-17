import type { Meta, StoryObj } from '@storybook/react-vite';
import BookingForm from '@/pages/EeAdsRhf/BookingForm/BookingForm';

const meta = {
  title: 'ee-ads-rhf/BookingForm (Zod Validation)',
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
