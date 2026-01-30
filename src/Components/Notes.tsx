import { useState, useEffect } from "react";
import FullNoteEditor from "./FullNoteEditor";
import "./Notes.css";


type NoteColor = "blue" | "green" | "purple" | "orange";

type Note = {
  id: number;
  text: string;
  title: string;
  color: NoteColor;
};

function Notes() {

    //List of all the currently saved notes
    const [notes, setNotes] = useState<Note[]>(() => {
    //Looks in the browser's local storage for saved notes
    const savedNotes = localStorage.getItem("notes");
    //This will return the saved notes as an array, or an empty array if there are none
    return savedNotes ? JSON.parse(savedNotes) : [];
    });


    //Weather the user is creating a new note or not
    const [isFullEditorOpen, setIsFullEditorOpen] = useState(false);
    //Stores the id of the note being edited
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    //Used to drag notes arounds
    const [draggingId, setDraggingId] = useState<number | null>(null);

    //colors
    const colors: NoteColor[] = ["blue", "green", "purple", "orange"];

    //Context menu state
    //Need to track mouse position to display the menu there 
    //and which note it is for
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        noteId: number;
    } | null>(null);    

    function deleteNote(idToDelete: number) {
        setNotes(notes.filter((note) => note.id !== idToDelete));
    }

    //Saves notes to local storage whenever the notes state changes
    //This is because in the square brackets we put [notes] which is the dependency array
    //Any change to notes will trigger this useEffect
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    //Drag note functionality
    function handleDrop(targetId: number) {
        //if a note is dropped on itself or if no note is being dragged, do nothing
        if (draggingId === null || draggingId === targetId) return;

        //Find the indexes of the dragged note and the target note
        const draggedIndex = notes.findIndex(n => n.id === draggingId);
        const targetIndex = notes.findIndex(n => n.id === targetId);

        //Make a new array so react knows the state has changed
        const updatedNotes = [...notes];
        //Remove the dragged note
        const [draggedNote] = updatedNotes.splice(draggedIndex, 1);
        //Insert the note at the new position
        updatedNotes.splice(targetIndex, 0, draggedNote);

        //Save the new order of notes and clear the draggingId
        setNotes(updatedNotes);
        setDraggingId(null);
    }

    if (isFullEditorOpen) {
    return (
      <FullNoteEditor
        note={editingNote}
        onSave={(note) => {
          if (editingNote) {
            setNotes(notes.map((n) => (n.id === note.id ? note : n)));
          } else {
            setNotes([...notes, note]);
          }
          setEditingNote(null);
          setIsFullEditorOpen(false);
        }}
        onCancel={() => {
          setEditingNote(null);
          setIsFullEditorOpen(false);
        }}
      />
    );
  }
    
    return (
        <div className = "notes-page" onClick={() => setContextMenu(null)}>
            
            {/*Header of the notes app*/}
            <header className = "notes-header">
                <h1>Notes App</h1>
            </header>

            {/*Simple search bar, does not have functionality yet*/}
            <div className="search-bar">
                <input placeholder="Search notes, tags, or content" />
            </div>

             {/* Filters - Just random for now*/}
            <div className="filters">
                <button className="chip active">All</button>
                <button className="chip">Work</button>
                <button className="chip">Personal</button>
                <button className="chip">Ideas</button>
                <button className="chip">Travel</button>
            </div>
            
            {/*The actual list of notes*/}
            <div className="notes-grid">
            {notes.map((note) => (
            <div key={note.id}
            //Draggingid is only equal to the note being dragged, so we can add a special class to it
            className={`note-card ${note.color} ${draggingId === note.id ? "dragging" : ""}`}
            //Tells the browser this element is draggable
            draggable

            onContextMenu={(e) => {
                //This stops the default right click menu from appearing
                //and does this one instead
                e.preventDefault(); 
                setContextMenu({
                x: e.clientX,
                y: e.clientY,
                noteId: note.id,
                });
            }}

            //When the user starts dragging, set the draggingId to the id of the note being dragged
            onDragStart={() => setDraggingId(note.id)}
            //Allows the note to be dragged over other notes
            //By default, dropping is not allowed, so we need to prevent the default behavior
            onDragOver={(e) => e.preventDefault()}
            //Here is where the note are reordered, when the user drops the note being dragged over another note
            onDrop={() => handleDrop(note.id)}
            >
                <h2>{note.title || "Untitled"}</h2>
                <p className="note-text">{note.text}</p>

                <button onClick={() => {setEditingNote(note); setIsFullEditorOpen(true);}} >Edit</button>
                <button className="delete-btn" onClick={() => deleteNote(note.id)}> Delete </button>
            </div>
            ))}
            </div>


            {/*Right Click Menu */}
           {contextMenu && (
            <div
                className="context-menu" 
                style={{
                top: contextMenu.y,
                left: contextMenu.x,
                }}
            > Change Color:
                {colors.map((color) => (
                <button
                    key={color}
                    className={`color-option ${color}`}
                    onClick={() => {
                    setNotes(
                        notes.map((n) =>
                        n.id === contextMenu.noteId? { ...n, color }: n
                        )
                    );
                    setContextMenu(null);
                    }}
                >
                    {color}
                </button>
                ))}
            </div>
            )}


            {/* When user clicks button they can create a new note */}
            <button className="add-note-btn" onClick={() => {
                setEditingNote(null);
                setIsFullEditorOpen(true);
            }}
            >＋</button>

            {/* Bottom Nav */}
            <nav className="bottom-nav">
                <span className="active">Notes</span>
                <span>Folders</span>
                <span>Favorites</span>
                <span>Settings</span>
            </nav>

        </div> 
    )
};

export default Notes