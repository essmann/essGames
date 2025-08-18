import {parseDevelopers} from "./parseText";
import { parseGenres } from "./parseText";
function GameSidebar({ game }) {
  return (
    <div className="game_menu_sidebar">
      <div id="game_menu_title">{game?.title}</div>

      <div className="game_menu_sidebar_item">
        <span className="game_menu_label">Developed by: </span>
        <span>{parseDevelopers(game.developers)}</span>
      </div>
      <div className="game_menu_sidebar_item">
        <span className="game_menu_label">Released on: </span>
        <span>{game.release_date}</span>
      </div>
      <div className="game_menu_sidebar_item">
        <span>{parseGenres(game.genres)}</span>
      </div>
    </div>
  );
}

export default GameSidebar;
