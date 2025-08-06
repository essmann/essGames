import { useEffect, useState } from "react";
import CustomizedRating from "./CustomizedRating";
import handleUpdateGame from "../database/handleUpdateGame";
import GameMenu from "./GameMenu";
import { useGlobalContext } from "../Context/useGlobalContext";
import GradeIcon from '@mui/icons-material/Grade';
function GameCard({ game }) {
  const { clickedGameId, setClickedGameId, setGames } = useGlobalContext();
  const { posterURL, title } = game;
  const [isHovered, setIsHovered] = useState(false);

  const handleRatingChange = async (value) => {
    console.log("rating changed:", value);

    // Update global state
    setGames((prevGames) =>
      prevGames.map((g) => (g.id === game.id ? { ...g, rating: value } : g))
    );

    // Update DB with updated game
    const updatedGame = { ...game, rating: value };
    await handleUpdateGame(updatedGame);
    console.log("Updated game in DB:", updatedGame);
  };

  useEffect(() => {
    console.log(
      "GameCard re-rendered. Game: " +
        JSON.stringify({ name: game.title, rating: game.rating })
    );
  });

  return (
    <div className="game_card_container">
      <div id={game.id} className={`game_card ${isHovered ? "selected" : ""}`}>
        <img
          src={posterURL}
          alt={`${title} poster`}
          className="game_card_poster"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setClickedGameId(game.id);
            console.log(clickedGameId);
          }}
        />
        <div className="game_card_title">{title}</div>

        {/* <CustomizedRating onRating={handleRatingChange} rating={game.rating} /> */}
        <div className="game_card_footer">
          <div className="footer_title truncate">
            <div>{title}</div>
            <div id="test4">
              <div className="footer_rating">
                <GradeIcon fontSize="small"/>
              {game.rating  + "/10"}
              </div>
              <br />
              {/* <span className="footer_star_icon">
                <span><GradeIcon fontSize="small" /></span>
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
