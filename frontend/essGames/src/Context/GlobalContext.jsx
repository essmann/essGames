// src/context/GlobalContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [addGameMenuIsDisplayed, setAddGameMenuIsDisplayed] = useState(false);
  const [clickedGameId, setClickedGameId] = useState(null);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);

  return (
    <GlobalContext.Provider value={{
      games,
      setGames,
      addGameMenuIsDisplayed,
      setAddGameMenuIsDisplayed,
      clickedGameId,
      setClickedGameId,
      selectedListItemIndex,
      setSelectedListItemIndex,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
