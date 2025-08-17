import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/useGlobalContext";
import GradeIcon from "@mui/icons-material/Grade";
import emptyPoster from "../assets/poster_not_found.jpg";
function GameCard({ game }) {
  const { clickedGameId, setClickedGameId } = useGlobalContext();
  const { posterURL, title } = game;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="game_card_container">
      <div id={game.id} className={`game_card ${isHovered ? "selected" : ""}`}>
        <img
          src={posterURL || emptyPoster}
          alt={`${title} poster`}
          className="game_card_poster"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setClickedGameId(game.id || game.AppID);
            console.log(clickedGameId);
          }}
        />
        <div className="game_card_title">{title}</div>

        <GameCardFooter title={title} rating={game.rating} />
      </div>
    </div>
  );
}

export default GameCard;

const GameCardFooter = ({ title, rating }) => {
  return (
    <div className="game_card_footer">
      <div className="footer_title truncate">
        <div>{title}</div>
        <div id="test4">
          <div className="footer_rating">
            <GradeIcon fontSize="small" />
            {rating + "/10"}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};
