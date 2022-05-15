import { Avatar, AvatarGroup } from "@mui/material";
import { isSameYear, parseISO } from "date-fns";
import { memo } from "react";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";

function ActiveEditors({ activeNoteId }) {
  const activeThisYear = useSelector((state) => {
    const noteEditors = state.noteMetadata[activeNoteId].noteLastEdited;

    return Object.values(state.editors).filter(
      (editor) =>
        noteEditors[editor.id] &&
        isSameYear(parseISO(noteEditors[editor.id]), new Date())
    );
  });

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
