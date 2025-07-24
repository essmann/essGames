function GameCard({ game }) {
  const { poster, title } = game;

  return (
    <div className="game_card">
      <img src={poster} alt={`${title} poster`} className="game_card_poster" />
      <div className="game_card_title">{title}</div>
    </div>
  );
}

export default GameCard;
