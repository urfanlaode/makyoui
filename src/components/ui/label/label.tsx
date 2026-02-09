import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { labelVariants } from './label.variants'

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, disabled, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn(labelVariants({ variant, disabled, className }))} {...props}>
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }
