import { useState } from "react";
import "./App.css";
import Sidebar from "./components/ButtonUsage";
import GameCard from "./components/GameCard";
import AddGameCard from "./components/AddGame/AddGameCard";
import GameGrid from "./components/GameGrid";
import GameMenu from "./components/GameMenu";
import handleGetGames from "./database/handleGetGames";
import { useEffect } from "react";
import handleDeleteGame from "./database/handleDeleteGame";
import { useGlobalContext } from "./Context/useGlobalContext";
import { Backdrop } from "@mui/material";
import {CircularProgress} from "@mui/material";
import HorizontalNonLinearStepper from "./components/HorizontalLinearStepper";
import { useStyleContext } from "./Context/useStyleContext";
import { StyleProvider } from "./Context/StyleContext";
import AddGameInput from "./components/AddGame/AddGameInput";
function App() {
  const [loading, setLoading] = useState(true);
  const {
    setGames,
    addGameMenuIsDisplayed,
    clickedGameId,
    selectedListItemIndex,
    setSelectedListItemIndex,
  } = useGlobalContext();
  
  const GLOBAL_STYLES = {

  }
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
          setLoading(false); // ✅ Done loading
    });
  }, []);

  // Usage example with an actual game object
  // const newGame = { name: 'Cool Game', genre: 'Action', release_year: 2025 };
  // const x =  { id: 6, rating: 3.5, title: "Dead Space", posterURL: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", review:"" };
  // addGame(x).then((result) => {
  //   console.log('Added game:', result);
  // });

  return (
    <StyleProvider>
    {loading && 
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    
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
          <AddGameInput/>
        )}
        <GameMenu />        {/* <ContextMenu/> */}
      </div>
    </StyleProvider>
  );
}

export default App;
