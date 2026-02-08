import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from './chip'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    size: {
      control: 'select',
      options: ['default'],
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// Default chip
export const Default: Story = {
  args: {
    children: 'Chip',
    variant: 'default',
    size: 'default',
  },
}

// Closeable chip
export const Closable: Story = {
  args: {
    children: 'Closable Chip',
    variant: 'default',
    size: 'default',
    closeable: true,
    onClose: () => console.log('Chip closed'),
  },
}
