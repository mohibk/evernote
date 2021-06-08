import { useEffect } from "react";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { debounce } from "../../helpers";

export default function Editor({
  selectedNote,
  selectedNoteIndex,
  notes,
  updateNote,
}) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const updateBody = async (val) => {
    setText(val);
    update();
  };

  const update = useRef(
    debounce(() => {
      updateNote(id, { title: title, body: text });
    }, 1500)
  ).current;

  //   const update = useCallback(
  //     debounce(() => {
  //         console.log('updating database!')
  //     }, 1500),
  //     []
  // )

  useEffect(() => {
    if (selectedNote.docId !== id) {
      setText(selectedNote.body);
      setTitle(selectedNote.title);
      setId(selectedNote.docId);
    }

    // console.log("text", text);
  }, [selectedNote, id]);

  return (
    <div className="col-span-3">
      <ReactQuill value={text} onChange={updateBody} className="h-screen" />
    </div>
  );
}
