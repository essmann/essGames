import { useGlobalContext } from "../../../Context/useGlobalContext";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import MenuContainer from "../../MenuContainer";
import GamePoster from "./GamePoster";
import GameSidebar from "./GameSideBar";
import GameFooter from "./GameFooter";
import JsonComponent from "../../JsonComponent";
function GameMenu() {
  const { clickedGridGame, setClickedGridGame } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const handleCloseMenu = () => {
    setClickedGridGame(null);
    console.log("Clicked away");
  };
  return (
    <MenuContainer>
      <ClickAwayListener onClickAway={handleCloseMenu}>
        
        <div className="game_menu_container">
        <JsonComponent object={clickedGridGame}/>
          <div className="flex">
            <GamePoster game={clickedGridGame} />
            <GameSidebar game={clickedGridGame} />
          </div>
          <GameFooter game={clickedGridGame} />
        </div>
      </ClickAwayListener>
    </MenuContainer>
  );

  
}

export default GameMenu;
