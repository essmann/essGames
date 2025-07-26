// src/context/useGlobalContext.js

import { useContext } from 'react';
import { StyleContext } from './StyleContext';

export const useStyleContext = () => useContext(StyleContext);
