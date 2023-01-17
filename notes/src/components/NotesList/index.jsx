import { useMemo, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";
// import { Virtuoso } from "react-virtuoso";
import _ from "lodash";
import { useTransition } from "react";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  // Controls the input, needs to be updated immediately (because the input won’t rerender otherwise)
  const [filterInputValue, setFilterInputValue] = useState("");
  // Controls the filter, can be updated with a delay
  const [filterValue, setFilterValue] = useState("");

  const [isPending, startTransition] = useTransition();

  // const setFilterValueDebounced = useMemo(
  //   // useDebounce
  //   () => _.debounce(setFilterValue, 500),
  //   []
  // );

  // const filteredNotes = Object.values(notes)
  //   .sort((a, b) => b.date.getTime() - a.date.getTime())
  //   .filter(({ text }) => {
  //     if (!filter) {
  //       return true;
  //     }

  //     return text.toLowerCase().includes(filter.toLowerCase());
  //   });

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filterInputValue}
          onChange={(text) => {
            setFilterInputValue(text);

            // performance.mark("before startTransition");
            startTransition(() => {
              // performance.mark("after startTransition");
              // performance.measure(
              //   "startTransition delay",
              //   "before startTransition",
              //   "after startTransition"
              // );
              // when is this going to be executed?
              // 1) right when onChange is called
              // 2) in the next frame after onChange is called
              // 3) after a fixed delay after onChange is called
              // 4) after a variable delay after onChance is called
              setFilterValue(text);
              // -> isConcurrentRender = true
            });
          }}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {/* <Virtuoso
          totalCount={filteredNotes.length}
          itemContent={(index) => {
            const { id, text, date } = filteredNotes[index];
            return (
              // ResizeObserver doesn’t measure margins, so we use a padding: https://virtuoso.dev/#gotchas
              <div style={{ paddingBottom: 8 }}>
                <NoteButton
                  key={id}
                  id={id}
                  isActive={activeNoteId === id}
                  onNoteActivated={onNoteActivated}
                  text={text}
                  filterText={filter}
                  date={date}
                />
              </div>
            );
          }}
          increaseViewportBy={500}
        /> */}
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filterValue) {
              return true;
            }
            return text.toLowerCase().includes(filterValue.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              id={id}
              isActive={activeNoteId === id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filterValue}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        {useMemo(
          () => (
            <>
              <ButtonGroup size="small">
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 1, paragraphs: 1 })
                  }
                >
                  + Note
                </Button>
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 1, paragraphs: 300 })
                  }
                >
                  + Huge
                </Button>
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 100, paragraphs: 1 })
                  }
                >
                  + 100
                </Button>
              </ButtonGroup>
              <ButtonGroup size="small">
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() => onDeleteAllRequested()}
                >
                  Delete all
                </Button>
              </ButtonGroup>
            </>
          ),
          [onNewNotesRequested, onDeleteAllRequested]
        )}
      </div>
    </div>
  );
}

// Conceptual implementation of useTransition
// const updateQueue = [];

// setState = (newValue) => {
//   const stateUpdate = { currentComponent, newValue, isConcurrentRender };
//   updateQueue.push(stateUpdate);
//   scheduleRender();
//   // → Promise.then()
// };

// let isConcurrentRender = false;
// startTransition = (callback) => {
//   isConcurrentRender = true;
//   callback();
//   isConcurrentRender = false;
// };

// scheduleRender = () => {
//   if (renderAlreadyScheduled) return;
//   renderAlreadyScheduled = true;
//   Promise.resolve().then(() => {
//     processUpdateQueue();
//     renderAlreadyScheduled = false;
//   });
// };

// processUpdateQueue = () => {
//   while (updateQueue.length > 0) {
//     processUpdate(updateQueue.shift());
//   }
//   // → all updates in one go
// };

// const concurrentUpdateQueue = [
//   // ...
//   // ...
// ];
// // concurrent processing queue:
// performWorkUntilDeadline = () => {
//   while (concurrentUpdateQueue.length > 0 && !shouldYieldToHost()) {
//     performUnitOfWork(concurrentUpdateQueue.shift());
//   }

//   if (concurrentUpdateQueue.length > 0) schedulePerformWorkUntilDeadline();
// };

// processUpdate = () => {
//   const childUpdates = renderComponent(update);
//   childUpdates.forEach((child) => queue.push(child));
// };

// shouldYieldToHost = () => {
//   return performance.now() - startOfRender > 5 /* ms */;
// };

export default NotesList;
