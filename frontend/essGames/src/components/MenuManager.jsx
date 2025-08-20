import GameMenu from "./Menus/GameMenu/GameMenu";
import AddGameMenu from "./AddGame/AddGameMenu";
import { useState } from "react";
import { useEffect } from "react";

import { useGlobalContext } from "../Context/useGlobalContext";
import SearchGame from "./AddGame/SearchGame";
function MenuManager() {
  const [selectedSearchGame, setSelectedSearchGame] = useState(null);

  const {
    addGameMenuIsDisplayed,
    setClickedGridGame,
    clickedGridGame,
    searchDisplayed,
  } = useGlobalContext();
  useEffect(() => {
    console.log("Changed");
  }, [clickedGridGame]);
  return (
    <>
      {searchDisplayed && (
        <SearchGame setSelectedGame={setSelectedSearchGame} />
      )}
      <AddGameMenu
        selectedGame={selectedSearchGame}
        setSelectedGame={setSelectedSearchGame}
      />
      {clickedGridGame !== null && <GameMenu />}
    </>
  );
}

export default MenuManager;
