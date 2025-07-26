import { StrictMode, Profiler } from 'react'; // Import Profiler
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GlobalProvider } from './Context/globalContext';

// Your onRender callback:
function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime, interactions });
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GlobalProvider>
      <Profiler id="AppProfiler" onRender={onRender}>
        <App />
      </Profiler>
    </GlobalProvider>
  </StrictMode>
);
