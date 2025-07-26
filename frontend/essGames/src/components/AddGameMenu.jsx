import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import CustomizedRating from "./CustomizedRating";
import { useRef } from "react";
import generateGuidInteger from "../database/generateGuidInteger";
import handleAddGame from "../database/handleAddGame";
import { useGlobalContext } from "../Context/useGlobalContext";
import DotsMobileStepper from "./HorizontalLinearStepper";
import ControllableStates from "./ControllableStates";
import FreeSolo from "./ControllableStates";
import { useEffect } from "react";
const handleFileOpen = async (setFilePath) => {
  try {
    const dataUrl = await window.api.openImageFile(); // Get Data URL from main process
    if (dataUrl) {
      setFilePath(dataUrl); // Set the Data URL as the src for the image
      console.log(dataUrl); // Log the Data URL for debugging
    } else {
      setFilePath("No file selected");
    }
  } catch (error) {
    console.error("Failed to open file:", error);
  }
};

// Usage example:
// handleGetGames().then((games) => {
//   console.log(games);
// });

function AddGameMenu() {
  const [filePath, setFilePath] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  const { setGames, addGameMenuIsDisplayed, setAddGameMenuIsDisplayed } = useGlobalContext();
  // const [stepperStep, setStepperStep] = useState(0);
  const inputIsValid = () => {
    const currentTitle = titleRef.current?.value || "";
    return (
      currentTitle.trim() !== "" && filePath && filePath !== "No file selected"
    );
  };

  const addGame = () => {
    if (!inputIsValid()) {
      alert("Invalid input");
      setAddGameMenuIsDisplayed(false);
      return;
    }
    const title = titleRef.current.value.trim();
    const id = generateGuidInteger();
    const game = {
      id: id,
      posterURL: filePath,
      rating: rating,
      review: "",
      title: title,
    };
    handleAddGame(game).then(() => {
      setGames((prevGames) => [...prevGames, game]);
    });
    setAddGameMenuIsDisplayed(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setAddGameMenuIsDisplayed(false)}>
  <div>
    {addGameMenuIsDisplayed && <InputBox />}
  </div>
</ClickAwayListener>

  );
}


function InputBox({ options = [] }) {
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    inputRef.current?.focus();
    const _suggestions = [
    "Manual game configuration",
    ...Array(5).fill("suggestion 1"),
  ];
setSuggestions(_suggestions);
  }, []);

  useEffect(() => {
    suggestionRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedIndex]);

  const confirmSelection = () => {
    const selected = suggestions[selectedIndex];
    setInputValue(selected);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      confirmSelection();
    }
  };

  const handleSuggestionClick = (index) => {
    setSelectedIndex(index);
    confirmSelection();
    inputRef?.current.focus();
  };

  const handleSuggestionHover = (index) => {
    setSelectedIndex(index); // 👈 Hover selects
  };

  return (
    <div className="input_box">
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
        {suggestions.map((text, index) => (
          <div
            key={index}
            className={`suggestion ${index === selectedIndex ? "active" : ""}`}
            ref={(el) => (suggestionRefs.current[index] = el)}
            onClick={() => handleSuggestionClick(index)}
            onMouseEnter={() => handleSuggestionHover(index)} // 👈 Hover support
            style={{
              cursor: "pointer",
              padding: "4px 8px",
              userSelect: "none",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      

      
    </div>
  );
}

function GamePoster({ filePath, setFilePath }) {
  return (
    <>
      {filePath && filePath !== "No file selected" ? (
        <>
          <div className="game_add_menu_title"></div>
          <img
            src={filePath}
            className="game_add_menu_poster image_added"
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </>
      ) : (
        <EmptyImageWithBox setFilePath={setFilePath} />
      )}
    </>
  );
}
function EmptyImageWithBox({ setFilePath }) {
  return (
    <div className="game_add_menu_poster image_empty">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => handleFileOpen(setFilePath)}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default AddGameMenu;
