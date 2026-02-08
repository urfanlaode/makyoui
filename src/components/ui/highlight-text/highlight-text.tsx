import { escapeRegExp } from '@/lib/utils'

export interface HighlightTextProps {
  text: string
  query: string
  highlightClassName?: string
}

export function HighlightText({
  text,
  query,
  highlightClassName = 'bg-cyan-300',
}: HighlightTextProps) {
  if (!query.trim()) {
    return <>{text}</>
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <span key={index} className={highlightClassName}>
              {part}
            </span>
          )
        }
        return part || null
      })}
    </span>
  )
}
