import { Button } from "@mui/material";
import { unstable_batchedUpdates } from "react-dom";
import { useState } from "react";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import DarkModeSwitcher from "../DarkModeSwitcher";
import ActiveAuthors from "../ActiveAuthors";
import spinner from "./spinner.svg";
import "./index.css";

function PrimaryPane({ activeNoteId, notes, saveNote }) {
  const [isLoading, setIsLoading] = useState(false); // ← hook 1
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState();

  // const [{ isLoading, isPublic, publishedAt }, dispatch] = useReducer(reducer,
  //   { isLoading: false, isPublic: false, publishedAt: null })

  const togglePublic = async () => {
    setIsLoading(Math.random()); // → state 1
    setPublishedAt(null); // → state 3

    if (isPublic /* === false */) {
      // await fakeApi.setPublicStatus(false);
      // setIsPublic(false);
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();
      unstable_batchedUpdates(() => {
        setIsPublic(true); // → state 2
        setPublishedAt(publishedDate.toLocaleTimeString()); // → state 3
        setIsLoading(false); // → state 1
      });
    }
  };

  // Chains of Rerenders solutions:
  // 1) Update React 18
  // 2) switch to useReducer / single state object
  // 3) unstable_batchedUpdates()

  // Batching updates:
  //   setIsLoading(Math.random())
  //   setPublishedAt(Math.random())
  // React 17: less effective (only in event listeners)
  // React 18: works as you’d expect

  /*

  // Naive React 0.0.1:
  setState = (newState) => {
    rerenderStuff({ component: currentComponent, state: newState })
  }

  ////////////////////////////////////
  // React 17−:
  setState = (newState) => {
    updateQueue.push({ component: currentComponent, state: newState })
    if (!batchedUpdates) {
      rerenderStuff(updateQueue)
      updateQueue = []
    }
  }

  batchedUpdates = false
  onClick = (eventHandler) => {
    unstable_batchedUpdates(() => {
      eventHandler()
    })
  }

  unstable_batchedUpdates = (callback) => {
    batchedUpdates = true
    callback()
    batchedUpdates = false
    rerenderStuff(updateQueue)
  }

  ////////////////////////////////////
  // React 18:
  setState = (newState) => {
    updateQueue.push({ component: currentComponent, state: newState })

    scheduleUpdateOnFiber()
  }

  scheduled = false
  scheduleUpdateOnFiber = () => {
    if (scheduled) return
    scheduled = true
    // Promise.resolve().then()
    window.queueMicrotask(() => {
      rerenderStuff(updateQueue)
      updateQueue = []
      scheduled = false
    })

    unstable_batchedUpdates = cb => cb()
  */

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes">👀</div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1 className="primary-pane__header-text">Editor</h1>
        <ActiveAuthors />
        <DarkModeSwitcher />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
            startIcon={isPublic ? "🤫" : "👀"}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "Make Private"
              : "Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditor
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
      <div
        className={
          "primary-pane__spinner-wrapper" +
          (isLoading ? " primary-pane__spinner-wrapper_visible" : "")
        }
      >
        <img className="primary-pane__spinner" src={spinner} alt="" />
      </div>
    </div>
  );
}

export default PrimaryPane;
