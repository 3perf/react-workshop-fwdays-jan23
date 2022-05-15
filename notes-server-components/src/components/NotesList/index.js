'use client'

import { useState } from 'react'
import './index.css'
import FilterInput from '../FilterInput'
import NoteButton from '../NoteButton'
import { parseISO } from 'date-fns'
import { usePathname } from 'next/navigation'

function NotesList({ notes }) {
  const pathname = usePathname()
  const activeNoteId = pathname.split('/').pop()
  const [filter, setFilter] = useState('')

  return (
    <div className="notes-list" style={{ position: 'relative' }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort(
            (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
          )
          .filter(({ text }) => {
            if (!filter) {
              return true
            }

            return text.toLowerCase().includes(filter.toLowerCase())
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              id={id}
              isActive={activeNoteId === id}
              text={text}
              filterText={filter}
              date={date}
            />
          ))}
      </div>
    </div>
  )
}

export default NotesList
