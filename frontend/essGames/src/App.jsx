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
import handleDeleteGame from "./database/handleDeleteGame";
import { useGlobalContext } from "./Context/useGlobalContext";
function App() {
  const {
    setGames,
    addGameMenuIsDisplayed,
    clickedGameId,
    selectedListItemIndex,
    setSelectedListItemIndex,
  } = useGlobalContext();
  
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
    <button onClick={async ()=>{
      await handleDeleteGame(3).then(()=>{console.log("deleted")});
    }}>Delete game 3</button>
    <button onClick={async () => {
    }}>Update game 8</button>
      <div
        className={`container ${addGameMenuIsDisplayed || clickedGameId!== null ? "menuActive" : ""}`}
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
                <GameGrid/>
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
          <AddGameMenu />
        )}
        <GameMenu />        {/* <ContextMenu/> */}
      </div>
    </>
  );
}

export default App;
