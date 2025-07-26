import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import { useEffect } from "react";

function GameMenu() {
  const { clickedGameId, setClickedGameId } = useGlobalContext();

  useEffect(() => {
    console.log(clickedGameId);
  }, [clickedGameId]);

  if (clickedGameId === null) return null;

  return (
    <ClickAwayListener onClickAway={() => setClickedGameId(null)}>
      <div className="game_add_menu game_menu">
        Clicked game: {clickedGameId}
      </div>
    </ClickAwayListener>
  );
}

export default GameMenu;
