import "./RightClickMenu.css";

type Position = {
  x: number;
  y: number;
  noteId: number;
};

type Props = {
  position: Position | null;
  onChangeColor: () => void;
  onClose: () => void;
};

function ContextMenu({ position, onChangeColor, onClose }: Props) {
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

      <div
        className="menu-item submenu"
        onClick={(e) => {
          e.stopPropagation();
          onChangeColor();
        }}
      >
        Change color ▸
      </div>

      <div className="menu-separator" />

      <div className="menu-item danger">Delete</div>
    </div>
  );
}

export default ContextMenu;
