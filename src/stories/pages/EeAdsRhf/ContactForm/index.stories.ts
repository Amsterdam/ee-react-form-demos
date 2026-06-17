import type { Meta, StoryObj } from '@storybook/react-vite';
import ContactForm from '@/pages/EeAdsRhf/ContactForm/ContactForm';

const meta = {
  title: 'ee-ads-rhf/ContactForm (Zod Validation)',
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
