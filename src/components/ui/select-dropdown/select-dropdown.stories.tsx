import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectDropdown, type Option } from './select-dropdown'

const meta = {
  title: 'UI/SelectDropdown',
  component: SelectDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    withSearch: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    withPortal: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-2xl px-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectDropdown>

export default meta
type Story = StoryObj<typeof meta>

const options: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option with icon' },
  { value: 3, label: 'Long Long Option 3' },
  { value: 4, label: 'Long Long Long Option 4' },
  { value: 5, label: 'Long Long Long Long Option 5' },
]

// Single selection
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return (
      <div className="space-y-4">
        <SelectDropdown {...args} value={value} onChange={setValue} label="Label" />
      </div>
    )
  },
  args: {
    options,
  },
}

// Single selection with search
export const WithSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return (
      <div className="space-y-4">
        <SelectDropdown {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    options: options,
    withSearch: true,
  },
}

// Multiple selection
export const Multiple: Story = {
  render: (args) => {
    const [values, setValues] = useState<number[]>([])
    return (
      <div className="space-y-4">
        <SelectDropdown {...args} value={values} onChange={setValues} />
      </div>
    )
  },
  args: {
    options: options,
    multiple: true,
  },
}

// Multiple selection with search
export const MultipleWithSearch: Story = {
  render: (args) => {
    const [values, setValues] = useState<number[]>([])
    return (
      <div className="space-y-4">
        <SelectDropdown {...args} value={values} onChange={setValues} />
        <div className="text-xs text-gray-500">
          Selected ({values.length}): {values.length > 0 ? values.join(', ') : 'None'}
        </div>
      </div>
    )
  },
  args: {
    options: options,
    multiple: true,
    withSearch: true,
    placeholder: 'Search and select multiple...',
  },
}

// Outlined variant
export const Outlined: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return <SelectDropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: options,
    variant: 'outlined',
  },
}

// Small size
export const Small: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return <SelectDropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: options,
    size: 'sm',
  },
}

// Large size
export const Large: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return <SelectDropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: options,
    size: 'lg',
  },
}

// Disabled
export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>(2)
    return <SelectDropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: options,
    disabled: true,
  },
}

// With portal
export const WithPortal: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return <SelectDropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: options,
    withPortal: true,
  },
}
