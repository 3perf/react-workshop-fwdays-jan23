import { useLayoutEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import "./index.css";
import TextMeasure from "../TextMeasure";

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const currentNote = notes[activeNoteId];
  const textareaRef = useRef();
  const [editorHeight, setEditorHeight] = useState(0);

  useLayoutEffect(() => {
    const textareaHeight = textareaRef.current?.offsetHeight;
    if (editorHeight !== textareaHeight) {
      setEditorHeight(textareaHeight);
    }
  });

  return (
    <div className="note-editor" key={activeNoteId}>
      <ContentEditable
        className="note-editor__contenteditable"
        innerRef={textareaRef}
        html={currentNote.text}
        onChange={(e) => saveNote({ text: e.target.value })}
      />
      <div className="note-editor__measure">
        <TextMeasure
          textLength={currentNote.text.length}
          textHeight={editorHeight}
        />
      </div>
    </div>
  );
}

export default NoteEditor;
