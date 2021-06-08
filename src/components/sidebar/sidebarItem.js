import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags, truncator } from "../../helpers";

export default function SidebarItem({
  note,
  index,
  selectedNoteIndex,
  selectNote,
  deleteNote,
}) {
  const handleDeleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deleteNote(note);
    }
  };

  return (
    <ListItem
      className="w-full py-1.5 border-b cursor-pointer"
      selected={selectedNoteIndex === index}
    >
      <ListItemText
        onClick={() => selectNote(note, index)}
        className="w-full"
        primary={note.title}
        secondary={truncator(removeHTMLTags(note.body), 25)}
      />
      <DeleteIcon
        onClick={() => handleDeleteNote(note)}
        color="secondary"
        className="cursor-pointer"
      />
    </ListItem>
  );
}
