import { useEffect, useState } from "react";
import "./Folder.css";

//What a folder contains
type Folder = {
  id: number; //To track each folder
  name: string;
};

//Creates a folder and save
export default function Folder() {
  const [folders, setFolders] = useState<Folder[]>(() => {
    const saved = localStorage.getItem("folders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  function addFolder() {
    const name = prompt("Folder name?");
    if (!name || !name.trim()) return;

    const newFolder: Folder = {
      id: Date.now(),
      name: name.trim(),
    };

    setFolders([...folders, newFolder]);
  }

  return (
    <div className="notes-page folders-page">
      <div className="folders-title-wrap">
        <h1 className="folders-title">Folders</h1>
      </div>

      <div className="folders-list">
        {folders.length === 0 ? (
          <p style={{ padding: "0 20px", opacity: 0.7 }}>
            No folders yet.
          </p>
        ) : (
          folders.map((folder) => (
            <div key={folder.id} className="folder-row">
               {folder.name}
            </div>
          ))
        )}
      </div>

      <div className="folders-cta">
        <button
          className="folders-create-btn"
          onClick={addFolder}
          type="button"
        >
          + Create Folder
        </button>
      </div>
    </div>
  );
}