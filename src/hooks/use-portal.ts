import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react'

export interface PortalPosition {
  top: number
  left: number
  width: number
}

export interface UsePortalOptions {
  enabled?: boolean
  offset?: number
}

/**
 * Manage portal positioning
 */
export function usePortal(
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  options: UsePortalOptions = {}
) {
  const { enabled = true, offset = 4 } = options

  const [position, setPosition] = useState<PortalPosition>({
    top: 0,
    left: 0,
    width: 0,
  })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()

    setPosition({
      top: rect.bottom + offset,
      left: rect.left,
      width: rect.width,
    })
  }, [triggerRef, offset])

  useLayoutEffect(() => {
    if (!isOpen || !enabled) return
    updatePosition()
  }, [isOpen, enabled, updatePosition])

  useEffect(() => {
    if (!isOpen || !enabled) return

    const handleScroll = () => {
      updatePosition()
    }

    const handleResize = () => {
      updatePosition()
    }

    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, enabled, updatePosition])

  return {
    position,
    updatePosition,
    style: enabled
      ? {
          position: 'fixed' as const,
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          zIndex: 9999,
        }
      : undefined,
  }
}
