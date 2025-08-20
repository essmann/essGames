import { useContext } from 'react';
import { GlobalContext } from "../Context/globalContext";
import AddGameCard from "./AddGame/AddGameCard";
import GameCard from "./GameCard";
import { useGlobalContext } from '../Context/useGlobalContext';
import SortGamesHeader from './SortGamesHeader';
import { useEffect } from 'react';
import JsonComponent from './JsonComponent';

function GameGrid() {
  const {
    games,
    setGames,
    setAddGameMenuIsDisplayed,
    setClickedGameId,
  } = useGlobalContext();

  useEffect(()=>{
   console.log("GameGrid re-rendered"); 
  })
  return ( 
    <>
    
      <div className='absolute'><JsonComponent object={games}/></div>
    <div className="grid_view">
      <SortGamesHeader/>
      <AddGameCard setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}/> {/* AddGameCard can directly access the context */}
      { games.map((game) => (
        <GameCard 
          key={game.id || game.AppID}
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
