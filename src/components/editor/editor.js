import { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";

export default function Editor({
  selectedNote,
  selectedNoteIndex,
  notes,
  updateNote,
}) {
  const [text, setText] = useState(() => selectedNote.body);
  const [title, setTitle] = useState(() => selectedNote.title);
  const [id, setId] = useState(() => selectedNote.docId);

  const handleChange = (e) => {
    setText(e);
    debounce(id, title, text);
  };

  const debounce = useCallback(
    _.debounce((id, title, text) => {
      updateNote(id, { title, text });
    }, 1500),
    []
  );

  useEffect(() => {
    if (selectedNote.docId !== id) {
      setText(selectedNote.body);
      setTitle(selectedNote.title);
      setId(selectedNote.docId);
    }
  }, [id, selectedNote]);

  return (
    <div className="col-span-3">
      <ReactQuill value={text} onChange={handleChange} className="h-screen" />
    </div>
  );
}
