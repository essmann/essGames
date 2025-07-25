import { useContext } from 'react';
import { GlobalContext } from "../Context/globalContext";
import AddGameCard from "./AddGameCard";
import GameCard from "./GameCard";

function GameGrid({ games, setAddGameMenuIsDisplayed, setGames }) {

  return ( 
    <div className="grid_view">
      <AddGameCard setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}/> {/* AddGameCard can directly access the context */}
      {/* {games.map((game) => (
        <GameCard 
          key={game.id}
          game={game}
        />
      ))}  */
            Array(10).fill(games).flatMap(arr => arr).map((game, index) => (
        <GameCard 
            key={`${game.id}-${index}`}  // unique key by combining id and index
            game={game}
            setGames = {setGames}

        />
        ))

      }
    </div>
  );
}

export default GameGrid;
