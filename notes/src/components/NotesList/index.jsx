import { useMemo, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";
import { useLayoutEffect } from "react";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filter, setFilter] = useState("");

  // useLayoutEffect(() => {
  //   const allNoteButtons = document.querySelectorAll(
  //     ".notes-list__note-header"
  //   );

  //   // 1) All the reads
  //   const allNoteButtonsOverflowing = [...allNoteButtons].map(
  //     (i) => i.scrollWidth > i.clientWidth
  //   );

  //   // 2) All the writes
  //   for (const [index, noteButton] of allNoteButtons.entries()) {
  //     if (allNoteButtonsOverflowing[index]) {
  //       noteButton.classList.add("notes-list__note-header_overflowing");
  //     } else {
  //       noteButton.classList.remove("notes-list__note-header_overflowing");
  //     }
  //   }
  // }, [notes]);

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filter) {
              return true;
            }

            return text.toLowerCase().includes(filter.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              id={id}
              isActive={activeNoteId === id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filter}
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

export default NotesList;
