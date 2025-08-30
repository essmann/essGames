import { useState } from "react";
import { useEffect } from "react";
import Suggestion from "./Suggestion";
function SuggestionContainer({ array }) {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setSuggestions(array);
  }, [array]);
  
  return (
    <div className="suggestion_container">
      {suggestions.map((suggestion) => {
        <Suggestion />;
      })}
    </div>
  );
}

export default SuggestionContainer;
