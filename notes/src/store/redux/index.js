import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import noteMetadataReducer from "./noteMetadataReducer";
import {
  loadNotesFromLocalStorage,
  saveNotesToLocalStorage,
} from "../../utils/storage";
import { formatISO } from "date-fns";

const noteEditors = {
  alexa: {
    id: "alexa",
    name: "Alexa",
  },
  "jake.sm": {
    id: "jake.sm",
    name: "Jake",
  },
  joshthegreat: {
    id: "joshthegreat",
    name: "Josh",
  },
  kattte: {
    id: "kattte",
    name: "Kate",
  },
  jake_33: {
    id: "jake_33",
    name: "Jake",
  },
};

const notes = loadNotesFromLocalStorage();

let initialNoteMetadata = {};
for (const id of Object.keys(notes)) {
  for (const editor of Object.values(noteEditors)) {
    initialNoteMetadata[id] = {
      noteLastEdited: {
        ...initialNoteMetadata[id]?.noteLastEdited,
        [editor.id]: formatISO(
          new Date(
            Math.random() > 0.3 ? 2023 : 2022,
            Math.random() * 12,
            Math.random() * 28
          ),
          { representation: "date" }
        ),
      },
    };
  }
}

const store = configureStore({
  reducer: combineReducers({
    currentEditor: (state = "alexa") => state,
    editors: (state = noteEditors) => state,
    notes: notesReducer,
    noteMetadata: noteMetadataReducer,
  }),
  preloadedState: {
    currentEditor: "alexa",
    editors: noteEditors,
    notes: notes,
    noteMetadata: initialNoteMetadata,
  },
});

let previousNotes = store.getState().notes;
store.subscribe(() => {
  const notes = store.getState().notes;
  if (notes !== previousNotes) {
    saveNotesToLocalStorage(notes);
  }
});

export default store;
