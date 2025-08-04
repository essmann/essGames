import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, useRef, useEffect } from "react";
import generateGuidInteger from "../../database/generateGuidInteger";
import handleAddGame from "../../database/handleAddGame";
import { useGlobalContext } from "../../Context/useGlobalContext";
import  { handleSearchGameCatalog } from "../../database/handleGetSteamGames";
import FloatingActionButtonSize from "../FloatingActionButtonSize";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// File picker
const handleFileOpen = async (setFilePath) => {
  try {
    const dataUrl = await window.api.openImageFile();
    if (dataUrl) {
      setFilePath(dataUrl);
    } else {
      setFilePath("No file selected");
    }
  } catch (error) {
    console.error("Failed to open file:", error);
  }
};

function AddGameInput({selectedGame, setSelectedGame}) {
  const [filePath, setFilePath] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [inputOptions, setInputOptions] = useState([]);
  

  
  const {
    setGames,
    addGameMenuIsDisplayed,
    setAddGameMenuIsDisplayed,
  } = useGlobalContext();

  const closeGameMenu = () => {
    // if(selectedGame){
    //   setSelectedGame(null);
    // }
    setAddGameMenuIsDisplayed(false);
    setInputOptions([]);
  }


  
  useEffect(() => {
  if (typeof debouncedInputValue !== "string" || debouncedInputValue.trim() === "") {
    setInputOptions([]);
    console.log("Empty, will just return.");
    return;
  }

  const fetchGames = async (prefix) => {
    const games = await handleSearchGameCatalog(prefix);
    console.log("games fetchgames: " + games);
    return games;
  };

  fetchGames(debouncedInputValue).then((games) => {
    if (games && Array.isArray(games)) {
      setInputOptions(games);
      console.log(`Displaying ${games.length} games from the catalog`);
    } else {
      setInputOptions([]);
      console.log("No games returned or result invalid");
      
    }
    console.log("Input options set:" + games);
  });
}, [debouncedInputValue]);




 

 

  if (!addGameMenuIsDisplayed) return null;

  return (
    <ClickAwayListener onClickAway={() => closeGameMenu()}>
      <div className="add_game_input_container">
        <InputBox inputHandler={setDebouncedInputValue} options={inputOptions} closeGameMenu={closeGameMenu} setSelectedGame={setSelectedGame}/>
      </div>
    </ClickAwayListener>
  );
}

// ────────── InputBox Component ──────────
function InputBox({ options = [], inputHandler, closeGameMenu, setSelectedGame }) {
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      console.log("Selected game:"+ JSON.stringify(game));
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
        setSelectedGame({name: "test", developers: "test2", release_date: "test_2003"});
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



export default AddGameInput;