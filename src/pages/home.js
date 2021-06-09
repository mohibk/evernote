import { useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import Sidebar from "../components/sidebar";
import { firebase, FieldValue } from "../lib/firebase";
// import { getAllNotes } from "../services/firebase";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  const createNote = async (title) => {
    const notes = {
      title,
      body: "",
      timestamp: FieldValue.serverTimestamp(),
    };
    await firebase.firestore().collection("notes").add(notes);
  };

  const updateNote = (id, noteObj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.text,
      timestamp: FieldValue.serverTimestamp(),
    });
  };

  const deleteNote = (id) => {
    firebase.firestore().collection("notes").doc(id).delete();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      // .orderBy("timestamp", "desc")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((item) => ({
          ...item.data(),
          docId: item.id,
        }));
        setNotes(notes);
      });
  }, []);

  return (
    <div className="max-w-screen-lg grid grid-cols-4 mx-auto">
      <Sidebar
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNote={selectNote}
        createNote={createNote}
        deleteNote={deleteNote}
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
