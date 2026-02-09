import { type RefObject, useEffect } from 'react'

/**
 * Hook to detect clicks outside an element
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs]

      for (const ref of refsArray) {
        const element = ref.current

        if (!element) continue

        if (element.contains(event.target as Node)) {
          return
        }
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [enabled, handler, refs])
}
