import MenuContainer from "../MenuContainer";
import Suggestion from "./Suggestion";
import SuggestionContainer from "./SuggestionContainer";
function SearchBox({ isVisible }) {
  return (
    <MenuContainer height={20} width={600} transparent={true}>
      <div id="search_box">
        <input placeholder="Search Game" />
      </div>
      <SuggestionContainer/>
    </MenuContainer>
  );
}

export default SearchBox;


const handleInput = async (input) => {
  
}