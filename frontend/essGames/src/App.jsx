import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/ButtonUsage'
import { Drawer } from '@mui/material';
function App() {
  const [count, setCount] = useState(0)
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);
  return (
    <>
      <div className="container">
          <Sidebar selectedListItemIndex={selectedListItemIndex} setSelectedListItemIndex={setSelectedListItemIndex}/>
          
          <div className="images">
            <div>1</div>
            <div>2</div>
          </div>

      </div>
    </>
  )
}

export default App
