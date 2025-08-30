import Suggestion from "./Suggestion";
import { useState } from "react";
import { useEffect } from "react";
import handleNavigationKey from "./handleNavigation";
function SuggestionContainer({ array, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(0);
  }, [array]);

  useEffect(() => {
    console.log(selectedIndex);
    return handleNavigationKey(
      array,
      selectedIndex,
      setSelectedIndex,
      onSelect
    );
  }, [array, selectedIndex, onSelect]);

  return (
    <div className="suggestion_container">
      {array.map((suggestion, index) => {
        return (
          <Suggestion
            key={suggestion.id}
            index={index}
            text={suggestion?.title}
            id={suggestion.id}
            isSelected={index === selectedIndex}
            onClick={() => {
              setSelectedIndex(index);
              onSelect?.(suggestion);
            }}
          />
        );
      })}
    </div>
  );
}

export default SuggestionContainer;
