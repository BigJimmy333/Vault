import { useState } from "react";
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

  //The right click menu has two levels, this keeps track of which level its on
  const [menuLevel, setMenuLevel] = useState<"root" | "colors">("root");

  if (!position) return null;

  //Distance from center
  const radius = 60; 

  //Makes sure when user right clicks it starts at the root
  //not the second layer
  function closeMenu() {
    setMenuLevel("root");
    onClose();
  }


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

      
    {/* Centre cancel button */}
    <button
        className="radial-center"
        onClick={(e) => {
        e.stopPropagation();
        onClose();
        }}
    >
    x
    </button>


    {/* ROOT MENU */}
      {menuLevel === "root" && (
        <>
          {/* Change Color option */}
          <button
            className="radial-option root-option"
            style={{
              transform:
                "rotate(0deg) translate(60px) rotate(0deg)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuLevel("colors");
            }}
          >
            Color
          </button>

          {/* Empty placeholders to keep 4-way balance */}
          {[90, 180, 270].map((angle) => (
            <div
              key={angle}
              className="radial-placeholder"
              style={{
                transform: `rotate(${angle}deg) translate(60px)`,
              }}
            />
          ))}
        </>
      )}


      {/*This divides the circle by the amount of colors (4) */}
     {menuLevel === "colors" && (
  <svg
    className="radial-svg"
    width={140}
    height={140}
    viewBox="0 0 140 140"
    onClick={(e) => e.stopPropagation()}
  >
     {/* Everything is drawn from the center */}
    <g transform="translate(70 70)">
      {/* Top */}
      <path
      //d = means draw this path, L = Line, A = Arc, Z = Close Shape
      //M0 0 = move object to centre
      //L0 -70 = from (0,0) to (0,-70) draw a line 
      //A70 70 = draw arc with radius 70, 0 = no rotation, 0 = use the short arc, 1 = sweep clockwise, 70,0 = end point of the arc
      //Z will close the shape
        d="M0 0 L0 -70 A70 70 0 0 1 70 0 Z"
        fill="#2563eb"
        onClick={() => {
          onSelect(position.noteId, "blue");
          closeMenu();
        }}
      />

      {/* Right */}
      <path
        d="M0 0 L70 0 A70 70 0 0 1 0 70 Z"
        fill="#22c55e"
        onClick={() => {
          onSelect(position.noteId, "green");
          closeMenu();
        }}
      />

      {/* Bottom */}
      <path
        d="M0 0 L0 70 A70 70 0 0 1 -70 0 Z"
        fill="#a855f7"
        onClick={() => {
          onSelect(position.noteId, "purple");
          closeMenu();
        }}
      />

      {/* Left */}
      <path
        d="M0 0 L-70 0 A70 70 0 0 1 0 -70 Z"
        fill="#f97316"
        onClick={() => {
          onSelect(position.noteId, "orange");
          closeMenu();
        }}
      />
    </g>
  </svg>
)}
      </div>
  );
}

export default RadialMenu;
