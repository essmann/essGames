import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, useRef, useEffect } from "react";
import generateGuidInteger from "../database/generateGuidInteger";
import handleAddGame from "../database/handleAddGame";
import { useGlobalContext } from "../Context/useGlobalContext";
import handleGetSteamgames from "../database/handleGetSteamGames";

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

function AddGameMenu() {
  const [filePath, setFilePath] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [inputOptions, setInputOptions] = useState([]);
  const [steamGames, setSteamgames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  
  const {
    setGames,
    addGameMenuIsDisplayed,
    setAddGameMenuIsDisplayed,
  } = useGlobalContext();



  
  useEffect(() => {
  console.log(`Input value: ${debouncedInputValue}`);

  if (typeof debouncedInputValue !== "string" || debouncedInputValue.trim() === "") {
    setInputOptions([]);
    return;
  }

  const filtered = steamGames.filter(game =>
    game.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
  );

  setInputOptions(filtered);
  console.log(filtered);
}, [debouncedInputValue]);


  useEffect(()=>{
    setInputOptions(["dingus", "apple"]);
    (async function(){
      const games = await handleGetSteamgames();
      setSteamgames(games);
      console.log(`Fetched ${games.length} from the steam file.`);
    })();
    
    
  },[])

  const inputIsValid = () => {
    const currentTitle = titleRef.current?.value || title;
    return currentTitle.trim() !== "" && filePath && filePath !== "No file selected";
  };

  const addGame = () => {
    if (!inputIsValid()) {
      alert("Invalid input");
      setAddGameMenuIsDisplayed(false);
      return;
    }

    const finalTitle = titleRef.current?.value?.trim() || title.trim();
    const id = generateGuidInteger();
    const game = {
      id,
      posterURL: filePath,
      rating,
      review: "",
      title: finalTitle,
    };

    handleAddGame(game).then(() => {
      setGames((prev) => [...prev, game]);
    });
    setAddGameMenuIsDisplayed(false);
  };

  if (!addGameMenuIsDisplayed) return null;

  return (
    <ClickAwayListener onClickAway={() => setAddGameMenuIsDisplayed(false)}>
      <div className="add_game_menu">
        <InputBox inputHandler={setDebouncedInputValue} options={inputOptions}/>
        <GamePoster filePath={filePath} setFilePath={setFilePath} />
        <button onClick={addGame}>Add Game</button>
      </div>
    </ClickAwayListener>
  );
}

// ────────── InputBox Component ──────────
function InputBox({ options = [], inputHandler }) {
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
      setInputValue(options[selectedIndex].name);
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
        {options.map((game, index) => (
          <div
            key={index}
            ref={(el) => (suggestionRefs.current[index] = el)}
            className={`suggestion ${index === selectedIndex ? "active" : ""}`}
            onClick={() => {
              setSelectedIndex(index);
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

// ────────── GamePoster and EmptyImageBox ──────────
function GamePoster({ filePath, setFilePath }) {
  return filePath && filePath !== "No file selected" ? (
    <div className="game_add_menu_poster image_added">
      <img
        src={filePath}
        alt="Selected"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  ) : (
    <EmptyImageWithBox setFilePath={setFilePath} />
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
