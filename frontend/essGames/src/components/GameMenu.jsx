import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import handleDeleteGame from "../database/handleDeleteGame";

function GameMenu() {
  const { clickedGameId, setClickedGameId, games, setGames } = useGlobalContext();

  const selectedGame = games.find((game) => game.id == clickedGameId);
  if (!selectedGame) return null;

  const handleDelete = async () => {
    try {
      setGames(prevGames => prevGames.filter(game => game.id !== clickedGameId));
      setClickedGameId(null);
      await handleDeleteGame(clickedGameId);
    } catch (error) {
      console.error("Failed to delete game:", error);
      // Optionally: revert UI changes or show notification
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setClickedGameId(null)}>
      <div className="game_add_menu game_menu">
        <div>{selectedGame.title}</div>
        <div className="image_container">
          <img src={selectedGame.posterURL} alt={selectedGame.title} />
        </div>
        <button className="delete_btn" onClick={handleDelete}>
          <DeleteForeverIcon fontSize="small" />
        </button> 
      </div>
    </ClickAwayListener>
  );
}

export default GameMenu;
