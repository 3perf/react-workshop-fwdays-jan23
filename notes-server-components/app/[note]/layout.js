import Authors from '../../src/components/Authors'
import './layout.css'

export default function NoteLayout({ children }) {
  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1>Note</h1>
        <Authors />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__view">{children}</div>
      </div>
    </div>
  )
}
