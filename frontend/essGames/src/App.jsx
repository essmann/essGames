import { useState } from 'react';
import './App.css';
import Sidebar from './components/ButtonUsage';
import GameCard from './components/GameCard';
import AddGameCard from './components/AddGameCard';
import AddGameMenu from './components/AddGameMenu';
import GameGrid from './components/GameGrid';
function App() {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);
  const [addGameMenuIsDisplayed, setAddGameMenuIsDisplayed] = useState(false);

  const games = [
    { id: 1, title: "Dead Space", poster: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Minecraft", poster: "https://i.pinimg.com/474x/81/61/32/816132e3f5cf75f6ddd44b5f6536cdac.jpg" },
    { id: 3, title: "World of Warcraft", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/World_of_Warcraft.png/250px-World_of_Warcraft.png" }
  ];

  return (
    <>
      <div className={`container ${addGameMenuIsDisplayed ? 'menuActive' : ''}`}>
        <Sidebar selectedListItemIndex={selectedListItemIndex} setSelectedListItemIndex={setSelectedListItemIndex} />

        {/* Use a function to return content based on selectedListItemIndex */}
        {(() => {
          switch (selectedListItemIndex) {
            case 0:
              return (
               <GameGrid games={games} setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed} />
            // setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}  
            );
              case 1:
                return (
                   <>
                    <div className='main_component'>
                      123
                    </div>
                   </>
                )
            // Add more cases here if you have other list items to display
            default:
              return null;
          }
        })()}

        {addGameMenuIsDisplayed && <AddGameMenu setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed} />}
      </div>
    </>
  );
}

export default App;
