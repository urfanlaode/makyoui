import { useClickOutside, usePortal } from '@/hooks'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import { forwardRef, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search, XCircle } from 'react-feather'
import { Chip } from '../chip'
import { HighlightText } from '../highlight-text'
import {
  dropdownMenuVariants,
  optionVariants,
  portalDropdownMenuVariants,
  searchInputVariants,
  selectDropdownVariants,
} from './select-dropdown.variants'
import { Label } from '../label'

export interface Option {
  value: string | number
  label: string
  icon?: React.ReactNode
  [key: string]: any
}

export interface SelectDropdownProps extends VariantProps<typeof selectDropdownVariants> {
  id?: string
  options: Option[]
  value?: string | number | (string | number)[]
  onChange?: (value: any) => void
  placeholder?: string
  disabled?: boolean
  className?: string

  multiple?: boolean

  withSearch?: boolean
  searchPlaceholder?: string

  renderOption?: (option: Option, isSelected: boolean) => React.ReactNode

  withPortal?: boolean

  onOpen?: () => void
  onClose?: () => void

  label?: string
}

const SelectDropdown = forwardRef<HTMLButtonElement, SelectDropdownProps>(
  (
    {
      id,
      options = [],
      value,
      onChange,
      placeholder = '',
      disabled = false,
      className,
      variant,
      size,
      multiple = true,
      withSearch = true,
      searchPlaceholder = '',
      renderOption,
      withPortal = true,
      onOpen,
      onClose,
      label,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const internalTriggerRef = useRef<HTMLButtonElement>(null)
    const triggerRef = (ref as React.RefObject<HTMLButtonElement>) || internalTriggerRef
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const selectedValues = Array.isArray(value) ? value : value ? [value] : []

    const getOptionLabel = (option: Option): string => {
      return String(option.label || '')
    }

    const getOptionValue = (option: Option): string | number => {
      return option.value
    }

    const isSelected = (option: Option): boolean => {
      const optVal = getOptionValue(option)
      return selectedValues.includes(optVal)
    }

    const filteredOptions = searchQuery
      ? options.filter((option) =>
          getOptionLabel(option).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options

    const handleSelect = (option: Option) => {
      const optVal = getOptionValue(option)

      if (multiple) {
        const newValues = isSelected(option)
          ? selectedValues.filter((v) => v !== optVal)
          : [...selectedValues, optVal]
        onChange?.(newValues)
      } else {
        onChange?.(optVal)
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    const handleCloseDropdown = useCallback(() => {
      setIsOpen(false)
      setSearchQuery('')
      onClose?.()
    }, [onClose])

    const toggleDropdown = () => {
      if (disabled) return

      if (!isOpen) {
        setIsOpen(true)
        onOpen?.()
      } else {
        setIsOpen(false)
        setSearchQuery('')
        onClose?.()
      }
    }

    useClickOutside([triggerRef, dropdownRef], () => handleCloseDropdown(), isOpen)

    // region: (Single mode)

    const getDisplayText = (): string => {
      if (selectedValues.length === 0) return placeholder

      const selectedOptions = options.filter((opt) => selectedValues.includes(getOptionValue(opt)))

      return selectedOptions[0] ? getOptionLabel(selectedOptions[0]) : placeholder
    }

    // endregion

    // region: (Multiple mode)

    const handleRemoveItem = (valueToRemove: string | number) => {
      const newValues = selectedValues.filter((v) => v !== valueToRemove)
      onChange?.(newValues)
    }

    const getSelectedOptions = (): Option[] => {
      return options.filter((opt) => selectedValues.includes(getOptionValue(opt)))
    }

    // endregion

    // region: Portal positioning

    const portal = usePortal(triggerRef, isOpen, {
      enabled: withPortal,
    })

    // endregion

    const renderDropdownContent = () => (
      <>
        {/* Search Input */}
        {withSearch && (
          <div className="sticky top-0 border-b border-gray-200 bg-white p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className={cn(searchInputVariants())}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                >
                  <XCircle size={16} className="fill-gray-300 rounded-full" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="py-1">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-center text-sm text-gray-500">Not found</div>
          ) : (
            filteredOptions.map((option) => {
              const selected = isSelected(option)
              const optionContent = renderOption ? (
                renderOption(option, selected)
              ) : (
                <HighlightText text={getOptionLabel(option)} query={searchQuery} />
              )

              return (
                <button
                  key={getOptionValue(option)}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(optionVariants({ selected }))}
                >
                  {optionContent}
                </button>
              )
            })
          )}
        </div>
      </>
    )

    return (
      <div className={cn('flex gap-4 items-center')}>
        {/* Label */}
        {label && (
          <Label htmlFor={id} disabled={disabled} className="w-1/3">
            {label}
          </Label>
        )}

        {/* Select */}
        <div className={cn('relative w-2/3', className)}>
          {/* Select Button */}
          <button
            ref={triggerRef}
            type="button"
            id={id}
            onClick={toggleDropdown}
            disabled={disabled}
            className={cn(selectDropdownVariants({ variant, size }))}
          >
            <span className={cn('flex-1 text-left', !multiple && 'truncate')}>
              {multiple && selectedValues.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {getSelectedOptions().map((option) => (
                    <Chip
                      key={getOptionValue(option)}
                      variant="default"
                      closeable
                      onClose={() => handleRemoveItem(getOptionValue(option))}
                    >
                      {getOptionLabel(option)}
                    </Chip>
                  ))}
                </div>
              ) : (
                <span className={selectedValues.length === 0 ? 'text-gray-400' : ''}>
                  {getDisplayText()}
                </span>
              )}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen &&
            (withPortal ? (
              // Portal element
              createPortal(
                <div
                  ref={dropdownRef}
                  className={cn(portalDropdownMenuVariants())}
                  style={portal.style}
                >
                  {/* Dropdown content */}
                  {renderDropdownContent()}
                </div>,
                document.body
              )
            ) : (
              // Non-portal element
              <div ref={dropdownRef} className={cn(dropdownMenuVariants())}>
                {/* Dropdown content */}
                {renderDropdownContent()}
              </div>
            ))}
        </div>
      </div>
    )
  }
)

SelectDropdown.displayName = 'SelectDropdown'

export { SelectDropdown }
