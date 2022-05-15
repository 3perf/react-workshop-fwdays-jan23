import Jabber from "jabber";
import { nanoid } from "nanoid";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markNoteEdited } from "../../store/redux/noteMetadataReducer";
import NotesList from "../NotesList";
import PrimaryPane from "../PrimaryPane";
import "./index.css";
import "./index-pro.css";
import { DarkModeProvider } from "../DarkModeContext";
import StatusBar from "../StatusBar";
import { deleteNotes, putNote } from "../../store/redux/notesReducer";

const jabber = new Jabber();

function App({ mobxStore }) {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const notes = useSelector((state) => state.notes);
  const currentEditor = useSelector((state) => state.currentEditor);

  const dispatch = useDispatch();

  const saveNote = (id, { text, date }) => {
    dispatch(putNote(id, text, date));
    dispatch(markNoteEdited(id, currentEditor));
  };

  const createNewNotes = useCallback(
    ({ count, paragraphs }) => {
      for (let i = 0; i < count; i++) {
        const noteId = nanoid();

        let noteText = jabber.createParagraph(6);
        for (let j = 0; j < paragraphs; j++) {
          let line = jabber.createParagraph(30);

          noteText += "\n\n" + line;
        }

        // Make random words bold or italic
        noteText = noteText
          .split("\n")
          .map((line) =>
            line
              .split(" ")
              .filter(Boolean)
              .map((word) => {
                if (Math.random() < 0.05) {
                  return "**" + word + "**";
                }

                if (Math.random() < 0.05) {
                  return "_" + word + "_";
                }

                return word;
              })
              .join(" ")
          )
          .join("\n");

        dispatch(putNote(noteId, noteText, new Date()));
        dispatch(markNoteEdited(noteId, currentEditor));

        // For convenience, if only a single note was created, activate it
        if (count === 1) {
          setActiveNoteId(noteId);
        }
      }
    },
    [currentEditor]
  );

  const deleteAllNotes = useCallback(() => {
    setActiveNoteId(null);
    dispatch(deleteNotes());
  }, []);

  return (
    <DarkModeProvider>
      <div className="notes">
        <div className="notes__columns">
          <div className="notes__column notes__column_list">
            <h1>NoteList</h1>
            <div className="notes__column-content">
              <NotesList
                notes={notes}
                activeNoteId={activeNoteId}
                onNoteActivated={setActiveNoteId}
                onNewNotesRequested={createNewNotes}
                onDeleteAllRequested={deleteAllNotes}
              />
            </div>
          </div>
          <div className="notes__column notes__column_primary">
            <div className="notes__column-content">
              <PrimaryPane
                activeNoteId={activeNoteId}
                notes={notes}
                saveNote={saveNote}
              />
            </div>
          </div>
        </div>
        <div className="notes__status-bar">
          <StatusBar store={mobxStore.statusBar} />
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default memo(App);
