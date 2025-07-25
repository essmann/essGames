// src/context/GlobalContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Example state in global context
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  
  // Example function to update the user state
  const loginUser = (userData) => {
    setUser(userData);
  };

  return (
    <GlobalContext.Provider value={{ user, loginUser, games, setGames }}>
      {children}
    </GlobalContext.Provider>
  );
};
