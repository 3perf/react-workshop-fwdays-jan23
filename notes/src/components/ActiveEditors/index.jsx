import { Avatar, AvatarGroup } from "@mui/material";
import { isSameYear, parseISO } from "date-fns";
import { memo } from "react";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";
import _ from "lodash";
import { createSelector } from "reselect";

// function activeThisYearSelector(state, activeNoteId) {
//   const noteEditors = state.noteMetadata[activeNoteId].noteLastEdited;
//   const editors = state.editors;

//   const activeThisYear = useMemo(
//     () =>
//       Object.values(editors).filter(
//         (editor) =>
//           noteEditors[editor.id] &&
//           isSameYear(parseISO(noteEditors[editor.id]), new Date())
//       ),
//     [editors, noteEditors]
//   );

//   return activeThisYear;
// }

const editorsSelector = (state) => state.editors;
const noteEditorsSelector = (state, activeNoteId) =>
  state.noteMetadata[activeNoteId].noteLastEdited;

const activeThisYearSelector = createSelector(
  [editorsSelector, noteEditorsSelector],
  (editors, noteEditors) => {
    console.log("activeThisYearSelector recomputed", { editors, noteEditors });
    return Object.values(editors).filter(
      (editor) =>
        noteEditors[editor.id] &&
        isSameYear(parseISO(noteEditors[editor.id]), new Date())
    );
  }
);
// (state) => /* ... */

// debugging reselect selectors when they change:
// 1) console.log(<selector name>, { selector inputs })
// 2) diff the outputs to see if there’s any actual difference
// 3) right click -> save as global variables and === to see if there’s any referencial difference
// 4) repeat for every selector that changes until you find the bit of the state that causes the change
// 5) figure out why that bit of the state has changed, using Redux DevTools

function ActiveEditors({ activeNoteId }) {
  const activeThisYear = useSelector((state) => {
    return activeThisYearSelector(state, activeNoteId);
  });

  // 1) Two useSelectors and returning primitives
  // const activeThisYearCount = useSelector(
  //   (state) => activeThisYearSelector(state, activeNoteId).length
  // );
  // const activeThisYearNames = useSelector((state) =>
  //   activeThisYearSelector(state, activeNoteId)
  //     .map((i) => i.name)
  //     .join(", ")
  // );

  // 2) Provide a custom comparator to useSelector
  // const activeThisYear = useSelector(
  //   (state) => {
  //     return activeThisYearSelector(state, activeNoteId);
  //   },
  //   // dangerous: very expensive with large objects
  //   (a, b) => _.isEqual(a, b)
  // );

  // 3) reselect
  //    if it doesn’t work, debug (see above)
  //    to fix: a) fix a reducer that makes the state change unnecessarily (add a custom comparison logic),
  //            b) immer
  // 4) ...

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisYear.length} editor{activeThisYear.length === 1 ? "" : "s"}{" "}
        active this year: {activeThisYear.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
}

export default memo(ActiveEditors);
