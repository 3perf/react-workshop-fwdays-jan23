import ReactMarkdown from "react-markdown";
import { parse } from "marked";
import gfm from "remark-gfm";
import { format } from "date-fns";
import "./index.css";
import { memo, useEffect, useRef } from "react";

function NoteButton({ isActive, onNoteActivated, id, text, filterText, date }) {
  const className = [
    "notes-list__button",
    "notes-list__note",
    isActive && "notes-list__note_active",
  ]
    .filter((i) => i !== false)
    .join(" ");

  // useWhyDidYouUpdate("NoteButton", {
  //   isActive,
  //   onNoteActivated,
  //   id,
  //   text,
  //   filterText,
  //   date,
  // });

  return (
    <button className={className} onClick={() => onNoteActivated(id)}>
      <span className="notes-list__note-meta">
        {format(date, "d MMM yyyy")}
      </span>
      {generateNoteHeader(text, filterText)}
    </button>
  );
}

function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

// 1) virtualization → react-virtuoso
// 2) find a cheaper library → marked
// 3) delay highlighting or search

function generateNoteHeader(text, filterText) {
  let firstLine = text
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0];

  // Wrap the filter text with a `<mark>` tag.
  // (The algorithm below is a bit buggy: if the note itself has any `~~something~~` entries,
  // they will be turned into `<mark>` as well. But this is alright for demo purposes.)
  let componentsMapping = {};
  if (
    filterText &&
    firstLine.toLowerCase().includes(filterText.toLowerCase())
  ) {
    // If `filterText` is `aa`, this splits `bbbbaacccaac` into ['bbb', 'aa', 'ccc', 'aa', 'c']
    // Based on example 2 in https://stackoverflow.com/a/25221523/1192426
    const firstLineParts = firstLine.split(
      new RegExp(
        "(" + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ")",
        "gi"
      )
    );

    // This wraps all `filterText` entries with a `del` tag.
    // ['bbb', 'aa', 'ccc', 'aa', 'c'] => ['bbb', '~~aa~~', 'ccc', '~~aa~~', 'c'] => 'bbb~~aa~~ccc~~aa~~c'
    firstLine = firstLineParts
      .map((part) => {
        if (part.toLowerCase() === filterText.toLowerCase()) {
          return `~~${part}~~`;
        }

        return part;
      })
      .join("");

    // This ensures that all `filterText` entries are actually wrapped with `mark`, not with `del`
    componentsMapping = {
      del: "mark",
    };
  }

  // return (
  //   <div
  //     dangerouslySetInnerHTML={{
  //       __html: parse(
  //         firstLine
  //           .replace("<p>", "")
  //           .replace("</p>", "")
  //           .replace("<del>", "<mark>")
  //           .replace("</del>", "</mark>")
  //       ),
  //     }}
  //   ></div>
  // );

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      disallowedElements={["p", "h1", "h2", "h3", "h4", "h5", "h6"]}
      unwrapDisallowed={true}
      components={componentsMapping}
    >
      {firstLine}
    </ReactMarkdown>
  );
}

export default memo(NoteButton);

// Exercise optimizations:
// 1) NoteButton -> pass the first line instead of the whole text
// 2) React-Markdown → marked
// 3) storage → only save one note at a time (!)
// 4) PrimaryPane: notes → activeNote (not effective here)
// 5) Editor: onChange → onBlur + onbeforeunload
