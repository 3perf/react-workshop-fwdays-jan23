import { memo } from 'react'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

function generateNoteHeader(text, filterText) {
  const firstLine = text
    .split('\n')
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0]

  if (firstLine.toLowerCase().includes(filterText.toLowerCase())) {
    // Split firstLine using `filterText` as a delimiter – but keep `filterText` as a part of the string.
    // See example 2 in https://stackoverflow.com/a/25221523/1192426
    const firstLineParts = firstLine.split(
      new RegExp(
        '(' + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ')',
        'gi'
      )
    )

    return firstLineParts.map((part, index) => {
      if (part.toLowerCase() === filterText.toLowerCase()) {
        return <mark key={index}>{part}</mark>
      }

      return part
    })
  }

  return firstLine
}

function NoteButton({ isActive, id, text, filterText, date }) {
  const className = [
    'notes-list__button',
    'notes-list__note',
    isActive && 'notes-list__note_active'
  ]
    .filter((i) => i !== false)
    .join(' ')

  return (
    <Link className={className} href={`/${id}`}>
      <span className="notes-list__note-meta">
        {format(parseISO(date), 'd MMM yyyy')}
      </span>
      {generateNoteHeader(text, filterText)}
    </Link>
  )
}

export default memo(NoteButton)
