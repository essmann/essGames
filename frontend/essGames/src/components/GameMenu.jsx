import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import handleDeleteGame from "../database/handleDeleteGame";
import CustomizedRating from "./CustomizedRating";
import handleUpdateGame from "../database/handleUpdateGame";
import { useEffect } from "react";
function GameMenu() {
  
  
  const { clickedGameId, setClickedGameId, games, setGames } = useGlobalContext();
useEffect(()=>{
      console.log(`Clicked game ID: ${clickedGameId}`);
    },[clickedGameId])

useEffect(()=>{
  console.log("Game menu rendered.");
  console.log("clickedGameId " + clickedGameId);
  console.log()
  console.table(games, games.length)
})
  const selectedGame = games.find((game) => (game.id || game.AppID) == clickedGameId);
  if (!selectedGame) return null;

  
  const handleDelete = async () => {
    try {
      setGames(prevGames => prevGames.filter(game => game.id !== clickedGameId));
      setClickedGameId(null);
      await handleDeleteGame(clickedGameId);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };
  const handleRatingChange = async (value) => {
      console.log("rating changed:", value);
  
      // Update global state
      setGames((prevGames) =>
        prevGames.map((g) => (g.id === selectedGame.id ? { ...g, rating: value } : g))
      );
  
      // Update DB with updated game
      const updatedGame = { ...selectedGame, rating: value };
      await handleUpdateGame(updatedGame);
      console.log("Updated game in DB:", updatedGame);
    };
    
    
  return (
    <ClickAwayListener onClickAway={() => setClickedGameId(null)}>
      <div className="add_game_menu_container">
        <div className="add_game_menu">
          <div className="poster_and_details_container">
            <div className="game_poster_container">
              <img
                src={selectedGame.posterURL}
                alt={selectedGame.title}
                className="game_poster"
              />
              <CustomizedRating  onRating={handleRatingChange} rating={selectedGame?.rating || 0} />
            </div>

            <div className="game_details_container">
              <div className="add_game_menu_title">{selectedGame.title}</div>
              <div className="detailed_description">
                {selectedGame.description || "No description available."}
              </div>
            </div>
          </div>

          <div className="add_game_submit">
            <button className="delete_btn" onClick={handleDelete}>
              <DeleteForeverIcon fontSize="small" />
              Delete Game
            </button>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default GameMenu;
