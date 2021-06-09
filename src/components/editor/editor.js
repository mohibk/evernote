import { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import BorderColorIcon from "@material-ui/icons/BorderColor";
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

  const updateBody = (e) => {
    setText(e);
    debounce(id, title, e);
  };

  const updateTitle = ({ target }) => {
    setTitle(target.value);
    debounce(id, target.value, text);
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
      <div className="flex bg-indigo-500 py-0.5 space-x-3 px-2">
        <BorderColorIcon />
        <input
          type="text"
          value={title}
          className="bg-indigo-500 text-white focus:outline-none py-1 w-2/3"
          onChange={updateTitle}
        />
      </div>
      <ReactQuill value={text} onChange={updateBody} className="h-screen" />
    </div>
  );
}
