
import GameMenu from "./GameMenu";
import AddGameMenu from "./AddGame/AddGameMenu";
import { useState } from "react";

import { useGlobalContext } from "../Context/useGlobalContext";
import SearchGame from "./AddGame/SearchGame";
function MenuManager() {
      const [selectedSearchGame, setSelectedSearchGame] = useState(null);
    
  const { addGameMenuIsDisplayed, clickedGameId, searchDisplayed } =
    useGlobalContext();

  return (
    <>
      {searchDisplayed && (
        <SearchGame setSelectedGame={setSelectedSearchGame} />
      )}
      <AddGameMenu
        selectedGame={selectedSearchGame}
        setSelectedGame={setSelectedSearchGame}
      />
      {clickedGameId !== null && <GameMenu />}
    </>
  );
}

export default MenuManager;
