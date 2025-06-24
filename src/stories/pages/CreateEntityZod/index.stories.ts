import type { Meta, StoryObj } from '@storybook/react';
import CreateEntityZod from '@/pages/CreateEntityZod/CreateEntityZod';

const meta = {
  title: 'Plain HTML5/CreateEntity (Validation using Zod)',
  component: CreateEntityZod,
  parameters: {
    layout: 'fullscreen',
    options: {
      panelPosition: 'bottom',
      bottomPanelHeight: 0,
    },
  },
} satisfies Meta<typeof CreateEntityZod>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
