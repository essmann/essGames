// src/context/useGlobalContext.js

import { useContext } from 'react';
import { GlobalContext } from './globalContext';

export const useGlobalContext = () => useContext(GlobalContext);
