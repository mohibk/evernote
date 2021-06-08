import { useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import Sidebar from "../components/sidebar";
import { firebase } from "../lib/firebase";
// import { getAllNotes } from "../services/firebase";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  const updateNote = (id, noteObj) => {
    console.log(id, noteObj);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      await firebase
        .firestore()
        .collection("notes")
        .onSnapshot((serverUpdate) => {
          const notes = serverUpdate.docs.map((item) => ({
            ...item.data(),
            docId: item.id,
          }));
          setNotes(notes);
        });
    };
    fetchNotes();
  }, []);

  return (
    <div className="max-w-screen-lg grid grid-cols-4 mx-auto">
      <Sidebar
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNote={selectNote}
      />
      {selectedNote && (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          updateNote={updateNote}
        />
      )}
    </div>
  );
}
