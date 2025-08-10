import React, { createContext, useState, useEffect } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [gameDeleted, setGameDeleted] = useState(false);
  const [gameSaved, setGameSaved] = useState(false);
  const [gameUpdated, setGameUpdated] = useState(false);
 const [gameAdded, setGameAdded] = useState(false);

  function addSnackbar(snackbar){
    
  }



  return (
    <SnackbarContext.Provider value={{
      snackbarQueue, 
      setSnackbarQueue,
      gameDeleted,
      setGameDeleted,
      gameSaved,
      setGameSaved,
      gameAdded,
      setGameAdded
    }}>
      {children}
    </SnackbarContext.Provider>
  );
};
