import GameMenu from "./Menus/GameMenu/GameMenu";
import { useState } from "react";
import { useEffect } from "react";

import { useGlobalContext } from "../Context/useGlobalContext";
import SearchBox from "./SearchBox/SearchBox";
function MenuManager() {
  const [selectedSearchGame, setSelectedSearchGame] = useState(null);

  const {
    addGameMenuIsDisplayed,
    setClickedGridGame,
    clickedGridGame,
    searchDisplayed,
    setSearchDisplayed
  } = useGlobalContext();
  
  return (
    <>
      {addGameMenuIsDisplayed && (
        <AddGameMenu
          selectedGame={selectedSearchGame}
          setSelectedGame={setSelectedSearchGame}
        />
      )}
      {clickedGridGame !== null && <GameMenu />}
      {searchDisplayed && <SearchBox  onClose={()=>setSearchDisplayed(false)}/>}
    </>
  );
}

export default MenuManager;
