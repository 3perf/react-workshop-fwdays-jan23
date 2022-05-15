import { createAction } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";

export const markNoteEdited = createAction(
  "notes/markNoteEdited",
  (noteId, editorId) => {
    return {
      payload: {
        noteId,
        editorId,
        date: formatISO(new Date(), { representation: "date" }),
      },
    };
  }
);

const defaultNoteMetadata = {};

const userReducer = (noteMetadata = defaultNoteMetadata, action) => {
  if (action.type === markNoteEdited.toString()) {
    const noteToUpdate = noteMetadata[action.payload.noteId] ?? {};
    const noteLastEdited = noteToUpdate.noteLastEdited || {};

    return {
      ...noteMetadata,
      [action.payload.noteId]: {
        ...noteToUpdate,
        noteLastEdited: {
          ...noteLastEdited,
          [action.payload.editorId]: action.payload.date,
        },
      },
    };
  }

  return noteMetadata;
};

export default userReducer;
