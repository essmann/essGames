import { useState } from "react";
import CustomizedRating from "./CustomizedRating";
import handleUpdateGame from "../database/handleUpdateGame";


function GameCard({ game, setGames }) {
  const { posterURL, title } = game;
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(game.rating || 0);

  const handleRatingChange = async (value) => {
    console.log("rating changed:", value);

    // 1️⃣ Update local rating
    setRating(value);

    // 2️⃣ Update state
    setGames(prevGames =>
      prevGames.map(g =>
        g.id === game.id ? { ...g, rating: value } : g
      )
    );

    // 3️⃣ Update DB with updated game
    const updatedGame = { ...game, rating: value };
    await handleUpdateGame(updatedGame);
    console.log("Updated game in DB:", updatedGame);
  };

  return (
    <div className={`game_card ${isHovered ? 'selected' : ''}`}>
      <img
        src={posterURL}
        alt={`${title} poster`}
        className="game_card_poster"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="game_card_title">{title}</div>
      <div className="game_card_buttons_bottom">
        <div className="game_card_delete_button">
                   
      
     
    
      
    

      
        </div>
      </div>
      <CustomizedRating
        onRating={handleRatingChange}
        rating={rating}
      />
    </div>
  );
}

export default GameCard;
