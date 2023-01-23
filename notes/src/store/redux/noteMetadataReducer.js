import { createAction } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import { produce } from "immer";

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

const noteMetadataReducer = (noteMetadata = defaultNoteMetadata, action) => {
  // state.noteMetadata[activeNoteId].noteLastEdited
  if (action.type === markNoteEdited.toString()) {
    console.log("noteMetadataReducer: markNoteEdited", action.payload);
    const noteToUpdate = noteMetadata[action.payload.noteId] ?? {};
    const noteLastEdited = noteToUpdate.noteLastEdited || {};

    // if (noteLastEdited[action.payload.editorId] === action.payload.date) {
    //   return noteMetadata;
    // }

    return produce(noteMetadata, (draft) => {
      // draft.array[0].nestedArray.push(someValue);
      // "2023-01-23"
      draft[action.payload.noteId].noteLastEdited[action.payload.editorId] =
        // "2023-01-23"
        action.payload.date;
    });
    // → track every change to draft using an ES2015 Proxy
    // → create a new object with the changes from the draft applied

    // return {
    //   ...noteMetadata,
    //   [action.payload.noteId]: {
    //     ...noteToUpdate,
    //     noteLastEdited: {
    //       ...noteLastEdited,
    //       [action.payload.editorId]: action.payload.date,
    //     },
    //   },
    // };
  }

  // { alexa: "2021-01-01", bob: "2021-01-02", ... }

  return noteMetadata;
};

export default noteMetadataReducer;
