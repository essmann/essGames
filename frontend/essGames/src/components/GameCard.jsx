import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/useGlobalContext";
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import emptyPoster from "../assets/poster_not_found.jpg";
import handleToggleFavorite from "../gameAPI/handleToggleFavorite";

function GameCard({ game }) {
  const { setClickedGridGame } = useGlobalContext();
  const { posterURL, title } = game;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClickedGridGame(game);
    console.log(`You clicked the game: ${title}`);
  };

  return (
    <div className="game_card_container">
      <div className={`game_card ${isHovered ? "selected" : ""}`}>
        <img
          src={posterURL || emptyPoster}
          alt={`${title} poster`}
          className="game_card_poster"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        />
        <div className="game_card_title">{title}</div>
        <GameCardFooter game={game} />
      </div>
    </div>
  );
}

export default GameCard;

const GameCardFooter = ({ game }) => {
  const { setGames } = useGlobalContext();
  const [isFavorite, setIsFavorite] = useState(game?.is_favorite);

  useEffect(() => {
  setIsFavorite(game?.is_favorite);
}, [game?.is_favorite]);

  const handleFavoriteClick = () => {
    handleToggleFavorite(setIsFavorite, setGames, game);
  };

  return (
    <div className="game_card_footer">
      <div className="footer_title truncate">
        <div>{game.title}</div>
        <div className="footer_rating">
          <GradeIcon fontSize="small" />
          {game.rating + "/10"}
          <div className="footer_favorite" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
