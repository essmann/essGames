import { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/ButtonUsage";
import GameGrid from "./components/GameGrid";
import GameMenu from "./components/GameMenu";
import AddGameMenu from "./components/AddGame/AddGameMenu";

import handleGetGames from "./database/handleGetGames";

import { useGlobalContext } from "./Context/useGlobalContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { StyleProvider } from "./Context/StyleContext";

function App() {
  const [loading, setLoading] = useState(true);

  const {
    setGames,
    addGameMenuIsDisplayed,
    clickedGameId,
    selectedListItemIndex,
    setSelectedListItemIndex,
    anyMenuOpen
  } = useGlobalContext();

  useEffect(()=>{
    console.log("App.jsx rendered.");
  })
  useEffect(() => {
    handleGetGames().then((_games) => {
      setGames(_games);
      console.log(_games);
      setLoading(false);
    });
  }, [setGames]);

  return (
    <StyleProvider>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <div
        className={`container ${
          addGameMenuIsDisplayed || clickedGameId !== null ? "menuActive" : ""
        }`}
      >
        <div id="header">
          
        </div>
       <div id="main-content">
         
        <Sidebar
          selectedListItemIndex={selectedListItemIndex}
          setSelectedListItemIndex={setSelectedListItemIndex}
        />

        {(() => {
          switch (selectedListItemIndex) {
            case 0:
              return <GameGrid />;
            case 1:
              return <div className="main_component">123</div>;
            default:
              return null;
          }
        })()}

        <AddGameMenu />
        {clickedGameId !== null &&
        <GameMenu />}
       </div>
      </div>
    </StyleProvider>
  );
}

export default App;
