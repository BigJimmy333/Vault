import "./RightClickMenu.css";

type NoteColor = "blue" | "green" | "purple" | "orange";

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

function RadialMenu({ position, colors, onSelect, onClose }: Props) {
  if (!position) return null;

  //Distance from center
  const radius = 60; 

  return (
    //Points the menu in the centre of the mouse
    <div
      className="radial-menu"
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={onClose}
    >
      {/*This divides the circle by the amount of colors (4) */}
      {colors.map((color, index) => {
        const angle = (360 / colors.length) * index;
        
        return (
           //Positioning each option in a circle
          <button
            key={color}
            className={`radial-option ${color}`}
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
            }}
            onClick={(e) => {
              //allows a colour to be selected before closing
              e.stopPropagation(); 
              onSelect(position.noteId, color);
            }}
          />
        );
      })}
    </div>
  );
}

export default RadialMenu;
