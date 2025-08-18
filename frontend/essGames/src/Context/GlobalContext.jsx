import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [clickedGridGame, setClickedGridGame] = useState(null);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);
  const [addGameMenuIsDisplayed, setAddGameMenuIsDisplayed] = useState(false);
  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false);
  const [searchDisplayed, setSearchDisplayed] = useState(false);
  const [anyMenuOpen, setAnyMenuOpen] = useState(false);

  // Whenever any menu state changes, update anyMenuOpen:
 useEffect(() => {
  const timeout = setTimeout(() => {
    setAnyMenuOpen(addGameMenuIsDisplayed || menuIsDisplayed || searchDisplayed);
  }, 50); // 50ms debounce delay, adjust as needed

  return () => clearTimeout(timeout);
}, [addGameMenuIsDisplayed, menuIsDisplayed, searchDisplayed]);



  return (
    <GlobalContext.Provider value={{
      games,
      setGames,
      clickedGridGame,
      setClickedGridGame,
      selectedListItemIndex,
      setSelectedListItemIndex,
      addGameMenuIsDisplayed,
      setAddGameMenuIsDisplayed,
      menuIsDisplayed,
      setMenuIsDisplayed,
      searchDisplayed,
      setSearchDisplayed,
      anyMenuOpen,
      setAnyMenuOpen
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
