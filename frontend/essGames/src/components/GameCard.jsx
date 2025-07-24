import { useState } from "react";
function GameCard({ game }) {
  const { poster, title } = game;
  const [isHovered, setIsHovered] = useState(false);

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
    </div>
  );
}

export default GameCard;
