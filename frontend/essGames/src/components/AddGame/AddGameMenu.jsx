import AddGameInput from "./AddGameInput";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";

function AddGameMenu({game}) {
    const [selectedGame, setSelectedGame] = useState(null);

    return (  
        <>
            <AddGameInput selectedGame={selectedGame} setSelectedGame={setSelectedGame}/> 
            <ClickAwayListener onClickAway={() => setSelectedGame(null)}>
                <div>
                    {selectedGame && 
                        <div className="add_game_menu">
                            <h1>ADD GAME MENU IS OPEN</h1>
                        </div>
                    }
                </div>
            </ClickAwayListener>
        </>
    );
}

export default AddGameMenu;
