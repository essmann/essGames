import FloatingActionButtonSize from "../FloatingActionButtonSize";
import { useGlobalContext } from "../../Context/useGlobalContext";

function AddGameCard() {
  const { setSearchDisplayed } = useGlobalContext();

  return (
    <div className="game_card_add">
      <FloatingActionButtonSize onClick={() => setSearchDisplayed(true)} />
      <div className="game_card_title"></div>
    </div>
  );
}

export default AddGameCard;
