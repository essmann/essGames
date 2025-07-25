import { useContext } from 'react';
import { GlobalContext } from "../Context/globalContext";
import AddGameCard from "./AddGameCard";
import GameCard from "./GameCard";

function GameGrid({ games }) {
  const { addGameMenuIsDisplayed } = useContext(GlobalContext); // No need to destructure setAddGameMenuIsDisplayed here

  return ( 
    <div className="grid_view">
      <AddGameCard /> {/* AddGameCard can directly access the context */}
      {games.map((game) => (
        <GameCard 
          key={game.id}
          game={game}
        />
      ))} 
    </div>
  );
}

export default GameGrid;
