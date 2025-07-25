import { StrictMode } from 'react'; // StrictMode is optional but useful for development
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18+
import './index.css'; // Import styles
import App from './App.jsx'; // Import App component
import { GlobalProvider } from './Context/globalContext'; // Import GlobalProvider

// Create the root element for React 18
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot for React 18

// Render your app with GlobalProvider
root.render(
  <StrictMode> {/* Wrap with StrictMode */}
    <GlobalProvider> {/* Provide the context globally */}
      <App /> {/* Your main app */}
    </GlobalProvider>
  </StrictMode>
);
