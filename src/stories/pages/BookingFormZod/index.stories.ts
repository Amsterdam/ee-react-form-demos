import type { Meta, StoryObj } from '@storybook/react';
import BookingFormZod from '@/pages/BookingFormZod/BookingFormZod';
import rawComponent from '@/pages/BookingForm/BookingForm?raw';
import rawLoader from '@/components/Loader/Loader?raw';
import rawStyles from '@/pages/BookingForm/BookingForm.module.css?raw';
import rawFormCheckboxInput from '@/pages/BookingForm/components/FormCheckboxInput/FormCheckboxInput?raw';
import rawFormTextArea from '@/pages/BookingForm/components/FormTextArea/FormTextArea?raw';
import rawFormDateInput from '@/pages/BookingForm/components/FormDateInput/FormDateInput?raw';
import rawFormTimeInput from '@/pages/BookingForm/components/FormTimeInput/FormTimeInput?raw';
import rawtranslate from '@/pages/BookingForm/utils/translate?raw';

const meta = {
  title: 'Plain HTML5/BookingForm (Zod Validation)',
  component: BookingFormZod,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
    sourceCode: [
      { name: 'Bookingform.tsx', code: rawComponent },
      { name: 'Loader.tsx', code: rawLoader },
      { name: 'BookingForm.module.css', code: rawStyles },
      { name: 'FormCheckboxInput.tsx', code: rawFormCheckboxInput },
      { name: 'FormTextArea.tsx', code: rawFormTextArea },
      { name: 'DateInput.tsx', code: rawFormDateInput },
      { name: 'TimeInput.tsx', code: rawFormTimeInput },
      { name: 'translate.ts', code: rawtranslate },
    ],
  },
} satisfies Meta<typeof BookingFormZod>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
