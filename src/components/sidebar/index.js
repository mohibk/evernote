import { useState } from "react";
import SidebarItem from "./sidebarItem";
import List from "@material-ui/core/List";

export default function Sidebar({ notes, selectedNoteIndex, selectNote }) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const handleNewNote = () => {
    setAddingNote((addingNote) => !addingNote);
  };

  const updateTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleDelete = (note) => {
    console.log("deleted", note.title);
  };

  return (
    <div className="col-span-1 h-screen border-l">
      <button
        onClick={handleNewNote}
        className="bg-indigo-500 text-white px-2 py-1.5 focus:outline-none hover:bg-indigo-700 w-full uppercase"
      >
        {addingNote ? "Cancel" : "New Note"}
      </button>

      {addingNote ? (
        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            id="newNote"
            className="w-full focus:outline-none py-2 px-2 border-b"
            placeholder="Enter note title"
            onKeyUp={updateTitle}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1.5 focus:outline-none hover:bg-green-700 w-full uppercase"
          >
            Submit
          </button>
        </form>
      ) : null}

      <List className="w-full mt-4">
        {notes.map((note, index) => (
          <SidebarItem
            key={note.docId}
            note={note}
            index={index}
            selectedNoteIndex={selectedNoteIndex}
            selectNote={selectNote}
            deleteNote={handleDelete}
          />
        ))}
      </List>
    </div>
  );
}
