import React, { createContext, useState, useEffect } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [gameDeleted, setGameDeleted] = useState(false);
  const [gameSaved, setGameSaved] = useState(false);


  function addSnackbar(snackbar){
    
  }



  return (
    <SnackbarContext.Provider value={{
      snackbarQueue, 
      setSnackbarQueue,
      gameDeleted,
      setGameDeleted,
      gameSaved,
      setGameSaved
    }}>
      {children}
    </SnackbarContext.Provider>
  );
};
