
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useState } from "react";
function GameMenu({ setAddGameMenuIsDisplayed }) {
  const [gameMenuIsVisible, setGameMenuisVisible] = useState(true);
  return (
    <ClickAwayListener onClickAway={()=>setGameMenuisVisible(false)}>
        {gameMenuIsVisible ?
        <div className="game_add_menu game_menu">
            test
        </div>
        : <></>
        
      }

    </ClickAwayListener>
  );
}

export default GameMenu;
