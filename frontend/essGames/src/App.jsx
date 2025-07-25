import { useState } from 'react'
import './App.css'
import Sidebar from './components/ButtonUsage'
import GameCard from './components/GameCard';
import FloatingActionButtonSize from './components/FloatingActionButtonSize';
import AddGameCard from './components/AddGameCard';
import AddGameMenu from './components/AddGameMenu';
function App() {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);
  const [addGameMenuIsDisplayed, setAddGameMenuIsDisplayed] = useState(true);
  
  const games = [
    { id: 1, title: "Dead Space", poster: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Minecraft", poster: "https://i.pinimg.com/474x/81/61/32/816132e3f5cf75f6ddd44b5f6536cdac.jpg" },
    {id: 3, title: "World of Warcraft", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/World_of_Warcraft.png/250px-World_of_Warcraft.png"}
  ]
  return (
    <>
      <div className="container">
          <Sidebar selectedListItemIndex={selectedListItemIndex} setSelectedListItemIndex={setSelectedListItemIndex}/>

          <div className="grid_view">
            <AddGameCard setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}/>
                {games.map((game) => (
                  <GameCard 
                    key={game.id}
                    game={game} // assuming you're passing game details to the GameCard component
                  />
                ))}
              </div>

            {addGameMenuIsDisplayed && <AddGameMenu setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}/>}

      </div>
    </>
  )
}

export default App
