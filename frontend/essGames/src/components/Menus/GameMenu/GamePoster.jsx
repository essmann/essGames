import GradeIcon from "@mui/icons-material/Grade";

function GamePoster({ game }) {
  return (
    <div className="flex-col">
      <div className="game_menu_image_container flex">
        <img src={game?.posterURL} width={200} />
      </div>
      <GamePosterFooter game={game}/>
    </div>
  );
}

export default GamePoster;
const GamePosterFooter = ({ game }) => {
  return (
    <div className="game_menu_image_footer">
      <div className="footer_rating">
        <GradeIcon fontSize="small" />
        {game?.rating + "/10"}
        <br />
      </div>
    </div>
  );
};
