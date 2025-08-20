import truncateText from "./truncateText";
export const GameFooter = ({ game, maxText }) => {
  return (
    <div className="game_menu_footer">
      <div className="game_menu_footer_description">
        <GameDescription game={game} />
      </div>
    </div>
  );
};

const GameDescription = ({ game, maxText }) => {
  return (
    <div className="game_menu_description_overflow_container">
      <div>{game?.detailed_description}</div>
    </div>
  );
};
export default GameFooter;
