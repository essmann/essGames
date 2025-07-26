// src/context/GlobalContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const StyleContext = createContext();

// Provider component
export const StyleProvider = ({ children }) => {
  const styles = {
    dark: ""
  }

  return (
    <StyleContext.Provider value={{
      styles
    }}>
      {children}
    </StyleContext.Provider>
  );
};
