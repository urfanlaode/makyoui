import { cva } from 'class-variance-authority'

export const chipVariants = cva(
  'inline-flex items-center gap-1 rounded-full text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      },
      size: {
        default: 'h-6 px-2 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
