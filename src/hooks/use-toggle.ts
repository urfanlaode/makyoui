import { useCallback, useState } from 'react'

/**
 * Toggle hook for boolean states
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setToggle = useCallback((value: boolean) => setValue(value), [])

  return [value, toggle, setToggle]
}
