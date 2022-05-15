import AppWrapper from '../src/app-wrapper'
import NotesList from '../src/components/NotesList'
import RootStyleRegistry from '../src/components/RootStyleRegistry'
import notes from '../src/utils/notes.json'

import '../styles/globals.css'
import './layout.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div id="root">
          <RootStyleRegistry>
            <AppWrapper>
              <div className="notes">
                <div className="notes__column notes__column_list">
                  <h1>NoteReader</h1>
                  <div className="notes__column-content">
                    <NotesList notes={notes} />
                  </div>
                </div>
                <div className="notes__column notes__column_primary">
                  <div className="notes__column-content">{children}</div>
                </div>
              </div>
            </AppWrapper>
          </RootStyleRegistry>
        </div>
      </body>
    </html>
  )
}
