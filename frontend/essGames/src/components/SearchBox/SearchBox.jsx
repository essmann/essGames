import MenuContainer from "../MenuContainer";
import Suggestion from "./Suggestion";
import SuggestionContainer from "./SuggestionContainer";
import handleSearchGameCatalog from "../../database/catalog/handleSearchGameCatalog";
import { useState } from "react";
import { useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import { useRef } from "react";
function SearchBox({ onClose }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => handleInput(input, setSuggestions), 300);
    return () => clearTimeout(timer);
  }, [input]);

  // 👇 focus input on every render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  const onSelect = (suggestion) => {
    console.log("Selected suggestion: " + suggestion?.title);
  };
  const handleInput = async (input, setArray) => {
    let suggestions = await handleSearchGameCatalog(input);
    setArray(suggestions);
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        {" "}
        {/* 👈 wrapper div here */}
        <MenuContainer height={20} width={600} transparent={true}>
          <div id="search_box">
            <input
              ref={inputRef}
              placeholder="Search Game"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <SuggestionContainer array={suggestions} onSelect={onSelect} />
        </MenuContainer>
      </div>
    </ClickAwayListener>
  );
}
export default SearchBox;
