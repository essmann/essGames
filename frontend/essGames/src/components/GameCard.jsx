import { useState } from "react";
import CustomizedRating from "./CustomizedRating";
function GameCard({ game }) {
  const { poster, title } = game;
  const [isHovered, setIsHovered] = useState(false);
  const [gameClicked, setGameClicked] = useState(false);
  const [rating, setRating] = useState(game.rating || 0);
  return (
    <div className={`game_card ${isHovered ? 'selected' : ''}`}>
      <img
        src={poster}
        alt={`${title} poster`}
        className="game_card_poster"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="game_card_title">{title}</div>
      <CustomizedRating onRating={(value)=>setRating(value)} rating={rating}/>
    </div>
  );
}

export default GameCard;
