import { useContext } from 'react';
import { GlobalContext } from "../Context/globalContext";
import AddGameCard from "./AddGameCard";
import GameCard from "./GameCard";
import { useGlobalContext } from '../Context/useGlobalContext';
import SortGamesHeader from './SortGamesHeader';

function GameGrid() {
  const {
    games,
    setGames,
    setAddGameMenuIsDisplayed,
    setClickedGameId,
  } = useGlobalContext();
  return ( 
    <>
    
    <div className="grid_view">
      {games?.length > 0 && <SortGamesHeader/>}
      <AddGameCard setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}/> {/* AddGameCard can directly access the context */}
      { games.map((game) => (
        <GameCard 
          key={game.id}
          game={game}
          setGames = {setGames}
          setClickedGameId={setClickedGameId}
        />
      )) 
          

      }
    </div>
    </>  );
}

export default GameGrid;
