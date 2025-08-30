import { useRef, useEffect } from "react";

function Suggestion({ text, id, isSelected, onClick, index }) {
  const suggestionRef = useRef(null);

  useEffect(() => {
    scrollHandler(suggestionRef, isSelected, index);
  }, [isSelected, index]);

  return (
    <div
      className={`suggestion ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      id={id}
      ref={suggestionRef}
    >
      {text}
    </div>
  );
}

export default Suggestion;

const scrollHandler = (suggestionRef, isSelected, index) => {
  if (!suggestionRef?.current) return;

  const parent = suggestionRef.current.parentElement;

  if (!isSelected) return;

  if (index === 0 && parent) {
    // Scroll parent container to top for the first element
    parent.scrollTo({ top: 0 });
  } else {
    // Scroll normally for other elements
    suggestionRef.current.scrollIntoView({ block: "nearest" });
  }
};
