import { SelectDropdown } from '@/components/ui/select-dropdown'
import type { Option } from '@/components/ui/select-dropdown/select-dropdown'
import { useState } from 'react'

export function HomePage() {
  // region: SelectDropdown

  const selectDropdownOptions: Option[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option with icon' },
    { value: 3, label: 'Long Long Option 3' },
    { value: 4, label: 'Long Long Long Option 4' },
    { value: 5, label: 'Long Long Long Long Option 5' },
    { value: 6, label: 'Long Long Long Long Option Option 6' },
  ]

  const [value, setValue] = useState<number | undefined>(undefined)

  // endregion

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="border-b border-slate-300 pb-4">
        <div className="font-bold">Select Dropdown</div>
        <SelectDropdown
          options={selectDropdownOptions}
          value={value}
          onChange={setValue}
          label="Label"
        />
      </div>
    </div>
  )
}
