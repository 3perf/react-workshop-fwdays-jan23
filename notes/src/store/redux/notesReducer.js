import { createAction } from "@reduxjs/toolkit";

export const putNote = createAction("notes/putNote", (noteId, text, date) => {
  return {
    payload: {
      noteId,
      text,
      date: date.toISOString(),
    },
  };
});

export const deleteNotes = createAction("notes/deleteNotes");

export const defaultNotes = {};

const notesReducer = (notes = defaultNotes, action) => {
  if (action.type === putNote.toString()) {
    return {
      ...notes,
      [action.payload.noteId]: {
        id: action.payload.noteId,
        text: action.payload.text,
        date: action.payload.date,
      },
    };
  }

  if (action.type === deleteNotes.toString()) {
    return defaultNotes;
  }

  return notes;
};

export default notesReducer;
