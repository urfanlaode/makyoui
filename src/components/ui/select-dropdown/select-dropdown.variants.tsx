import { cva } from 'class-variance-authority'

export const selectDropdownVariants = cva(
  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-gray-300 bg-white hover:bg-gray-50',
        outlined: 'border border-gray-300 bg-gray-300 hover:bg-gray-50',
      },
      size: {
        default: 'min-h-10 px-3 py-2',
        sm: 'min-h-9 px-2 py-1.5 text-xs',
        lg: 'min-h-11 px-4 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const dropdownMenuVariants = cva(
  'absolute left-0 right-0 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95 z-9999',
  {
    variants: {
      fullWidth: {
        true: 'left-0 right-0',
        false: 'min-w-[200px]',
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  }
)

export const portalDropdownMenuVariants = cva(
  'fixed max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95 z-[9999]',
  {
    variants: {
      width: {
        auto: 'min-w-[200px]',
        trigger: '',
      },
    },
    defaultVariants: {
      width: 'trigger',
    },
  }
)

export const optionVariants = cva(
  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 cursor-pointer',
  {
    variants: {
      selected: {
        true: 'bg-cyan-50 font-medium',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export const searchInputVariants = cva(
  'w-full rounded border py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1',
  {
    variants: {
      variant: {
        default: 'border-gray-200 focus:border-gray-900 focus:ring-gray-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
