import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import { useState } from "react";
import MenuContainer from "./MenuContainer";
function GameMenu() {
  const { clickedGridGame, setClickedGridGame } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setClickedGridGame(null)}>
      <div></div>
    </ClickAwayListener>
  );
}

export default GameMenu;
