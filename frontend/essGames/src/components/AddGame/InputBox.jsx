// ────────── InputBox Component ──────────
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function InputBox({ options = [], inputHandler, closeGameMenu, setSelectedGame }) {
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(()=>{
    console.log("Input box rendered.");
  })
  // ------------- DEBOUNCING FUNCTION -------------//
  useEffect(() => {
    const timer = setTimeout(() => inputHandler(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue, inputHandler]);

  useEffect(() => {
    suggestionRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedIndex]);

  const confirmSelection = () => {
    if (options[selectedIndex]) {
      let game = options[selectedIndex];
      setInputValue(game.name);
      
      setSelectedGame(game);
      closeGameMenu();
      

      
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      confirmSelection();
      
    }
    else if (e.key === "Escape"){

      closeGameMenu();
    }
  };

  return (
    <div className="input_box">
      <div className="input_manual" onClick={(e)=>{
        e.stopPropagation();
        setSelectedGame("edit");
        closeGameMenu();
      }}>
          <AddCircleOutlineIcon/>
      </div>
      <input
        type="text"
        className="input_box_input"
        placeholder="Search"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="input_suggestions_container">
        {options.map((game, index) => (
          <div
            key={index}
            id={game.AppID}
            ref={(el) => (suggestionRefs.current[index] = el)}
            className={`suggestion ${index === selectedIndex ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(index);
              console.log("Clicked game: " + game.name);
              confirmSelection();
              inputRef.current.focus();
            }}
            onMouseEnter={() => setSelectedIndex(index)}
            style={{
              cursor: "pointer",
              padding: "4px 8px",
              userSelect: "none",
            }}
          >
            {game.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputBox;