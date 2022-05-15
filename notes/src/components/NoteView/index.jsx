import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RandomizeSizes from "../RandomizeSizes";

export default function NoteView({ text }) {
  return (
    <div className="note-view">
      <div className="note-view__controls">
        <RandomizeSizes numberOfParagraphs={text.split("\n\n").length} />
      </div>
      <div className="note-view__text">
        <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
