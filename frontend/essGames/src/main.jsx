import { StrictMode, Profiler } from 'react'; // Import Profiler
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GlobalProvider } from './Context/globalContext';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GlobalProvider>
        <App />
    </GlobalProvider>
  </StrictMode>
);
