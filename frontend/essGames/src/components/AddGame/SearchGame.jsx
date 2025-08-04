import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../../Context/useGlobalContext";
import { handleSearchGameCatalog } from "../../database/handleGetSteamGames";
import InputBox from "./InputBox";

function SearchGame({ setSelectedGame }) {
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [inputOptions, setInputOptions] = useState([]);

  const {
    addGameMenuIsDisplayed,
    setAddGameMenuIsDisplayed,
  } = useGlobalContext();

  const closeGameMenu = () => {
   
    setAddGameMenuIsDisplayed(false);
    setInputOptions([]);
  };

  useEffect(() => {
    if (
      typeof debouncedInputValue !== "string" ||
      debouncedInputValue.trim() === ""
    ) {
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
        <InputBox
          inputHandler={setDebouncedInputValue}
          options={inputOptions}
          closeGameMenu={closeGameMenu}
          setSelectedGame={setSelectedGame}
        />
      </div>
    </ClickAwayListener>
  );
}

export default SearchGame;
