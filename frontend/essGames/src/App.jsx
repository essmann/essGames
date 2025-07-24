import { useState } from 'react'
import './App.css'
import Sidebar from './components/ButtonUsage'
import GameCard from './components/GameCard';
function App() {
  const [count, setCount] = useState(0)
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(0);

  const games = [
    { id: 1, title: "Dead Space", poster: "https://m.media-amazon.com/images/M/MV5BOGM4OTBhZjktYzAxZC00OTdlLWI2ZTEtZTliNjQ1NDg5OTJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Minecraft", poster: "https://i.pinimg.com/474x/81/61/32/816132e3f5cf75f6ddd44b5f6536cdac.jpg" },
  ]
  return (
    <>
      <div className="container">
          <Sidebar selectedListItemIndex={selectedListItemIndex} setSelectedListItemIndex={setSelectedListItemIndex}/>

          <div className="grid_view">
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game} // assuming you're passing game details to the GameCard component
                  />
                ))}
              </div>

      </div>
    </>
  )
}

export default App
