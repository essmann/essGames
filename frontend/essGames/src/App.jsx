import { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/ButtonUsage";
import GameGrid from "./components/GameGrid";
import GameMenu from "./components/GameMenu";
import AddGameMenu from "./components/AddGame/AddGameMenu";

import handleGetUserGames from "./database/user/handleGetUserGames";

import { useGlobalContext } from "./Context/useGlobalContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { StyleProvider } from "./Context/StyleContext";
import SearchGame from "./components/AddGame/SearchGame";
import Alert from '@mui/material/Alert';
const Alerts = ({alerts, setAlerts}) => {
  return (
    <div className="alerts_container">
       {alerts?.map((key)=>{
          return <AlertWrapper alertsQueue={alerts} setAlertsQueue={setAlerts}/>
       })}

    </div>
  )
} 

const AlertWrapper = ({alertsQueue, setAlertsQueue}) => {
  const [timer, setTimer] = useState(1500);

  const shiftAlert = () => {
    let _alertsQueue = alertsQueue;
    let newQueue = _alertsQueue.shift();
    console.log("Removing an alert from the queue...");
    setAlertsQueue(newQueue);
  }
  useEffect( ()=>{
      setTimeout(()=>{
        try{
          shiftAlert();
        }
        catch(err){
          console.log("alertsQueue error: "+ err);
        }
      }, timer)
  }, [])
  return (
    <>
         <Alert severity="success"> Test alert </Alert>

    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true);
  const [alertQueue, setAlertQueue] = useState([]);

  

  const {
    setGames,
    addGameMenuIsDisplayed,
    clickedGameId,
    selectedListItemIndex,
    setSelectedListItemIndex,
    anyMenuOpen
  } = useGlobalContext();

  const [selectedSearchGame, setSelectedSearchGame] = useState(null);

  useEffect(()=>{
    console.log("App.jsx rendered.");
  })
  useEffect(() => {
    handleGetUserGames().then((_games) => {
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
        <Alerts alerts={alertQueue} setAlerts={setAlertQueue}/>
        <div id="header">
        <button onClick={()=>{
          setAlertQueue((prev)=>[...prev, 1]);
        }}>AddAlert</button>
          
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
        <SearchGame setSelectedGame={setSelectedSearchGame} />
        <AddGameMenu selectedGame = {selectedSearchGame} setSelectedGame={setSelectedSearchGame}/>
        {clickedGameId !== null &&
        <GameMenu />}
       </div>
      </div>
    </StyleProvider>
  );
}

export default App;
