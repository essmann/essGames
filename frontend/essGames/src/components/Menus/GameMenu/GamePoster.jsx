import GradeIcon from "@mui/icons-material/Grade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import handleUpdateGame from "../../../database/user/handleUpdateGame";
import { useGlobalContext } from "../../../Context/useGlobalContext";
import handleToggleFavorite from "../../../gameAPI/handleToggleFavorite";
import { useEffect } from "react";
function GamePoster({ game }) {
  return (
    <div className="flex-col">
      <div className="game_menu_image_container flex">
        <img src={game?.posterURL} width={200} />
      </div>
      <GamePosterFooter game={game} />
    </div>
  );
}

export default GamePoster;
const GamePosterFooter = ({ game }) => {
  const [isFavorite, setIsFavorite] = useState(game.is_favorite);
  const { games, setGames } = useGlobalContext();
  useEffect(() => {
  console.log(JSON.stringify({ ...game, posterURL: "" }));
  setIsFavorite(game.is_favorite);
  console.log(game.is_favorite);
}, [game]); // use [game] if game can change, otherwise [] is fine

  return (
    <div className="game_menu_image_footer">
      <div className="footer_rating">
        <GradeIcon fontSize="small" />
        {game?.rating + "/10"}
        <div
          className="footer_favorite"
          onClick={() =>
            handleToggleFavorite(setIsFavorite, setGames, game)
          }
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
        </div>
      </div>
    </div>
  );
};
