import { cva } from 'class-variance-authority'

export const labelVariants = cva('inline-block text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-gray-900',
      error: 'text-red-600',
    },
    disabled: {
      true: 'text-gray-400 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
  },
})
