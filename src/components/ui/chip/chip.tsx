import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { XCircle } from 'react-feather'
import { chipVariants } from './chip.variants'

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  closeable?: boolean
  onClose?: () => void
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, closeable = false, onClose, children, ...props }, ref) => {
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onClose?.()
    }

    return (
      <div className={cn(chipVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {closeable && (
          <button
            type="button"
            onClick={handleCloseClick}
            className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-black/10"
            aria-label="Close"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>
    )
  }
)

Chip.displayName = 'Chip'

export { Chip }
