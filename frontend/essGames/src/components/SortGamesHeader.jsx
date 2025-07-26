import React, { useState } from "react";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import { useGlobalContext } from "../Context/useGlobalContext";
import { useEffect } from "react";
const OPTIONS = ["Rating", "Date added"];

export default function SortGamesHeader({ onChange }) {
    const {games, setGames} = useGlobalContext();
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);

  const handleSelectChange = (e) => {
    var _option = e.target.value;
    setSelectedOption(_option);
    if (onChange) {
      onChange(e.target.value, sortDirection); // notify parent if needed
    }
  };

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
    if (onChange) {
      onChange(selectedOption, newSortDirection);
    }
  };

 const sortGames = (sortDirection, selectedOption) => {
  if(selectedOption === OPTIONS[1]) return; // skip sorting for "Date added"

  const sortedGames = [...games].sort((a, b) => {
    let ratingA = a.rating;
    let ratingB = b.rating;
    return sortDirection === 'desc' ? ratingA - ratingB : ratingB - ratingA;
  });

  setGames(sortedGames);
};
        useEffect(() => {
        
            
            console.log("You changed something!");
            console.log(sortDirection, selectedOption, games);
            sortGames(sortDirection, selectedOption);
        }, [sortDirection, selectedOption]);
  return (
    <nav aria-label="Sort games by" className="sort-bar_container">
      <div className="sort-bar" role="list">
        <select value={selectedOption} onChange={handleSelectChange}>
          {OPTIONS.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button className="sort_button" onClick={toggleSortDirection}>
          {sortDirection === "asc" ? <SouthIcon fontSize="small" /> : <NorthIcon fontSize="small" />}
        </button>
      </div>
    </nav>
  );
}
