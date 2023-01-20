import './index.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Suspense } from 'react'
import LazyHydrate from 'react-lazy-hydration'

export default function NoteView({ text }) {
  const textWithHeader = '## ' + text

  const paragraphs = textWithHeader.split('\n\n')

  return (
    // <Suspense>
    <LazyHydrate ssrOnly>
      <div className="note-view">
        {paragraphs.map((paragraph, index) => {
          return (
            <ReactMarkdown key={index} remarkPlugins={[gfm]}>
              {paragraph}
            </ReactMarkdown>
          )
        })}
      </div>
    </LazyHydrate>
    // </Suspense>
  )
}
