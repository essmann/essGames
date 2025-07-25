import { useState } from "react";
import "./App.css";
import Sidebar from "./components/ButtonUsage";
import GameCard from "./components/GameCard";
import AddGameCard from "./components/AddGameCard";
import AddGameMenu from "./components/AddGameMenu";
import GameGrid from "./components/GameGrid";
import GameMenu from "./components/GameMenu";
import handleGetGames from "./database/handleGetGames";
import { useEffect } from "react";
function App() {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);
  const [addGameMenuIsDisplayed, setAddGameMenuIsDisplayed] = useState(false);
  // const [games, setGames] = useState([
  //   { id: 1, rating: 3.5, title: "Dead Space", poster: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  //   { id: 2, rating: 4, title: "Minecraft", poster: "https://i.pinimg.com/474x/81/61/32/816132e3f5cf75f6ddd44b5f6536cdac.jpg" },
  //   { id: 3, rating: 5, review: "this is my review", title: "World of Warcraft", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/World_of_Warcraft.png/250px-World_of_Warcraft.png" }
  // ])
  const [games, setGames] = useState([]);
  
  // const addGame = async (game) => {
  //   try {
  //     const gameAdded = await window.api.addGame(game);
  //     return gameAdded;
  //   } catch (error){
  //     console.error("Failed to add game: ", error);
  //   }
  // }
  // // Usage example:
  useEffect(() => {
    handleGetGames().then((_games) => {
      setGames(_games);
      console.log(_games); // ✅ This is the new value
    });
  }, []);

  // Usage example with an actual game object
  // const newGame = { name: 'Cool Game', genre: 'Action', release_year: 2025 };
  // const x =  { id: 6, rating: 3.5, title: "Dead Space", posterURL: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", review:"" };
  // addGame(x).then((result) => {
  //   console.log('Added game:', result);
  // });

  return (
    <>
      <div
        className={`container ${addGameMenuIsDisplayed ? "menuActive" : ""}`}
      >
        <Sidebar
          selectedListItemIndex={selectedListItemIndex}
          setSelectedListItemIndex={setSelectedListItemIndex}
        />

        {/* Use a function to return content based on selectedListItemIndex */}
        {(() => {
          switch (selectedListItemIndex) {
            case 0:
              return (
                <GameGrid
                  games={games}
                  setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed}
                />
              );
            case 1:
              return (
                <>
                  <div className="main_component">123</div>
                </>
              );
            // Add more cases here if you have other list items to display
            default:
              return null;
          }
        })()}

        {addGameMenuIsDisplayed && (
          <AddGameMenu setAddGameMenuIsDisplayed={setAddGameMenuIsDisplayed} setGames={setGames} />
        )}
        <GameMenu />
      </div>
    </>
  );
}

export default App;
