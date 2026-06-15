import type { Meta, StoryObj } from '@storybook/react-vite';
import CreateEntity from '@/pages/ReactHookForm/CreateEntity/CreateEntity';

const meta = {
  title: 'ReactHookForm/CreateEntity',
  component: CreateEntity,
  parameters: {
    layout: 'fullscreen',
    pageBackgroundColor: '#fff',
    themes: {
      themeOverride: 'Compact',
    },
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof CreateEntity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
