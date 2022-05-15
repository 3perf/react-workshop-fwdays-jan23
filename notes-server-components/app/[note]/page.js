import { notFound } from 'next/navigation'

import NoteView from '../../src/components/NoteView'
import notes from '../../src/utils/notes.json'

export default function NotePage({ params }) {
  if (!notes[params.note]) {
    return notFound()
  }

  return <NoteView text={notes[params.note].text} />
}
