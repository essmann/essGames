import { useContext } from "react";
import { GlobalContext } from "../Context/globalContext";
import AddGameCard from "./AddGame/AddGameCard";
import GameCard from "./GameCard";
import { useGlobalContext } from "../Context/useGlobalContext";
import SortGamesHeader from "./SortGamesHeader";
import { useEffect } from "react";

function FavoriteGrid() {
  const { games, setGames, setAddGameMenuIsDisplayed, setClickedGameId } =
    useGlobalContext();

  return (
    <>
      <div className="grid_view">
        <SortGamesHeader />

        {games
          .filter((game) => game.is_favorite)
          .map((game) => (
            <GameCard
              key={game.id || game.AppID}
              game={game}
              setGames={setGames}
              setClickedGameId={setClickedGameId}
            />
          ))}
      </div>
    </>
  );
}

export default FavoriteGrid;
