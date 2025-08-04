import SearchGame from "./SearchGame";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import FloatingActionButtonSize from "../FloatingActionButtonSize";
import { useEffect } from "react";
import { useGlobalContext } from "../../Context/useGlobalContext";
function AddGameMenu() {
    const [selectedGame, setSelectedGame] = useState(null);
    const { setAddGameMenuIsDisplayed } = useGlobalContext();
    // Fix the parseDevelopers function to properly format and return the developers
    const parseDevelopers = (developers) => {
        if (!developers || developers.length === 0) return "Unknown Developer";  // Add fallback for no developers
        // Assuming developers is a string with names separated by commas, like 'Dev1, Dev2'
        const parsedDevs = developers.substring(2, developers.length -2);
        return parsedDevs;
    };
    const truncateText = (text, maxLength) => {
        if (!text) return null;
        let i = 0;
        let truncatedText = [];
        text.split(" ").map(word => {
            if(i>= maxLength) return;
            truncatedText.push(word);
            i++;
        })
        return truncatedText.join(" ") + "...";
    }
    useEffect(()=>{
        if(selectedGame){
            setAddGameMenuIsDisplayed(true);
        }
    },[selectedGame]);

    const handleCloseMenu = () => {
        setSelectedGame(null);
        setAddGameMenuIsDisplayed(false);
    }
    return (  
        <>
            <SearchGame setSelectedGame={setSelectedGame}/> 
            <ClickAwayListener onClickAway={handleCloseMenu}>
                <div>
                    {selectedGame && selectedGame !== 'custom' && 
                        <div className="add_game_menu">
                            <div> 
                                <EmptyGamePoster/>
                            </div>
                            <div> 
                                <div className="add_game_menu_title"> {selectedGame?.name}</div>
                                <div className="add_game_menu_release add_game_menu_developer">
                                    <span className="release">
                                        <span>Released on </span> <span id="release_date_span">{selectedGame?.release_date}</span>
                                        </span>    
                                    <div className="developers">Developed by: <span id="developed_by_right">{parseDevelopers(selectedGame?.developers)}</span></div>
                                 </div>
                                 <div className="detailed_description">
                                    {truncateText(selectedGame?.detailed_description, 35) || "No description available."}

                                     </div>
                            </div>
                        </div>
                    }
                </div>
            </ClickAwayListener>
        </>
    );
}

function EmptyGamePoster(){
    return (
        <div className="game_card_add " id="game_poster_add">
              <FloatingActionButtonSize />
              <div className="game_card_title"></div>
        </div>
    );
}

export default AddGameMenu;
