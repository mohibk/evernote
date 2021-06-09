import { useState } from "react";
import SidebarItem from "./sidebarItem";
import List from "@material-ui/core/List";

export default function Sidebar({
  notes,
  selectedNoteIndex,
  selectNote,
  createNote,
  deleteNote,
}) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");

  const handleNewNote = () => {
    setAddingNote((addingNote) => !addingNote);
  };

  const updateTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title);
    createNote(title);
    setTitle("");
  };

  const handleDelete = (id) => {
    console.log("deleted", id);
    deleteNote(id);
  };

  return (
    <div className="col-span-1 h-screen border-l border-r">
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
            value={title}
            onChange={updateTitle}
          />
          <button
            disabled={!title}
            type="submit"
            className={` text-white px-2 py-1.5 focus:outline-none  w-full uppercase ${
              title
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
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
