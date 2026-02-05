import { useState, useEffect } from "react";
import "./FullNoteEditor.css";

type Note = {
  id: number;
  title: string;
  text: string;
  color: "blue" | "green" | "purple" | "orange";
};

//Props are the inputs to the FullNoteEditor component
//They define what data the component needs to function
//Here we define a Props type that includes the note being edited (or null for a new note),
//a function to call when saving the note, and a function to call when cancelling
//This allows the FullNoteEditor to be reusable for both creating and editing notes
//And it communicates with its parent component through these props
type Props = {
  note: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
};

function FullNoteEditor({ note, onSave, onCancel }: Props) {
  //What the user is currently typing
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //Colours
  const colors = ["blue", "green", "purple", "orange"] as const;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];


  //When the note prop changes, update the text state or if there is no note, set text to empty string
  //So when the user click to edit a note, the text area will be filled with the note's text
  //And when creating a new note, the text area will be empty
  useEffect(() => {
    setTitle(note?.title ?? "");
    setText(note?.text ?? "");
  }, [note]);

  function save() {
    //If there is nothing written, do not save the note
    if (text.trim() === "") return;

    //Saves the note, this is done by creating a new id if the user is creating a new note
    //Or using the existing id if they are editing a note
    onSave({
      id: note ? note.id : Date.now(),
      title,
      text,
      color: randomColor,
    });
  }

  //What the full note editor looks like
  return (
    <div className="full-editor">
      <header className="editor-header">
        <button onClick={onCancel}>Back</button>

        <input
        className="editor-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={save}>Save</button>
      </header>

      <textarea
        className="editor-textarea"
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default FullNoteEditor;
