import "./RightClickMenu.css";

import type { NoteColor } from "./Notes";


type Position = {
  x: number;
  y: number;
  noteId: number;
};



type Props = {
  position: Position | null;
  colors: NoteColor[];
  onSelect: (noteId: number, color: NoteColor) => void;
  onClose: () => void;
};

function RightClickMenu({ position, colors, onSelect, onClose }: Props) {
  if (!position) return null;

  return (
    <div
      className="context-menu"
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={onClose}
    >
      <div className="menu-item">Rename</div>
      <div className="menu-item">Duplicate</div>

      <div className="menu-separator" />

      <div className="menu-item submenu">
        Change color ▸
        <div className="submenu-content">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-option ${color}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(position.noteId, color);
              }}
            />
          ))}
        </div>
      </div>

      <div className="menu-separator" />

      <div className="menu-item danger">Delete</div>
    </div>
  );
}

export default RightClickMenu;
