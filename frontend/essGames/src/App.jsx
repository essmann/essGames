import { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import GameGrid from "./components/GameGrid";
import GameMenu from "./components/Menus/GameMenu/GameMenu";
import AddGameMenu from "./components/AddGame/AddGameMenu";

import handleGetUserGames from "./database/user/handleGetUserGames";

import { useGlobalContext } from "./Context/useGlobalContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { StyleProvider } from "./Context/StyleContext";
import SearchGame from "./components/AddGame/SearchGame";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContext } from "./Context/SnackbarContext";
import { useContext } from "react";
import FavoriteGrid from "./components/FavoriteGrid";
import MainContent from "./components/MainContent";
import MenuManager from "./components/MenuManager";
function App() {
  const [loading, setLoading] = useState(true);

  // const {
  //   snackbarQueue, setSnackbarQueue
  // } = useContext(SnackbarContext);

  const {
    setGames,
    games,
    addGameMenuIsDisplayed,
    clickedGridGame,
    selectedListItemIndex,
    setSelectedListItemIndex,
    searchDisplayed,
  } = useGlobalContext();

  const {
    gameDeleted,
    setGameDeleted,
    gameSaved,
    setGameSaved,
    setGameAdded,
    gameAdded,
  } = useContext(SnackbarContext);

  const [selectedSearchGame, setSelectedSearchGame] = useState(null);

  useEffect(() => {
    handleGetUserGames().then((_games) => {
      setGames(_games);
      console.log(_games);
      setLoading(false);
    });
  }, [setGames]);

  useEffect(()=>{
    console.log("Games state has been changed");
  },[games])
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
          addGameMenuIsDisplayed || clickedGridGame !== null ? "menuActive" : ""
        }`}
      >
        <div id="header"></div>
        <div className="snackbar_container">
          {gameDeleted && (
            <Snackbar
              open={gameDeleted}
              onClose={() => setGameDeleted(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              message="Game Deleted."
            />
          )}
          {gameSaved && (
            <Snackbar
              open={gameSaved}
              onClose={() => setGameSaved(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              message="Game saved."
            />
          )}
          {gameAdded && (
            <Snackbar
              open={gameAdded}
              onClose={() => setGameAdded(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              message="Game added."
            />
          )}
        </div>

        <div id="main-content">
          <Sidebar
            selectedListItemIndex={selectedListItemIndex}
            setSelectedListItemIndex={setSelectedListItemIndex}
          />

          <MainContent selectedListItemIndex={selectedListItemIndex} />

          <MenuManager /> 
        </div>
      </div>
    </StyleProvider>
  );
}

export default App;
