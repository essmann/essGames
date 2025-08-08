import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import handleDeleteGame from "../database/user/handleDeleteGame";
import CustomizedRating from "./CustomizedRating";
import handleUpdateGame from "../database/user/handleUpdateGame";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function GameMenu() {
  const { clickedGameId, setClickedGameId, games, setGames } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: "",
    description: "",
    poster: "",
    rating: 0,
  });

  useEffect(() => {
    console.log(`Clicked game ID: ${clickedGameId}`);
  }, [clickedGameId]);

  useEffect(() => {
    console.log("Game menu rendered.");
    console.table(games, games.length);
  }, []);

  const selectedGame = games.find((game) => (game.id || game.AppID) == clickedGameId);
  if (!selectedGame) return null;

  const handleDelete = async () => {
    try {
      setGames((prevGames) => prevGames.filter((game) => game.id !== clickedGameId));
      setClickedGameId(null);
      console.log("Deleting game " + selectedGame.id);
      await handleDeleteGame(clickedGameId);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleEdit = (key, value) => {
    setEditDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  const handleRatingChange = async (value) => {
    console.log("rating changed:", value);
    setGames((prevGames) =>
      prevGames.map((g) => (g.id === selectedGame.id ? { ...g, rating: value } : g))
    );

    const updatedGame = { ...selectedGame, rating: value };
    await handleUpdateGame(updatedGame);
    console.log("Updated game in DB:", updatedGame);
  };

  const parseDevelopers = (devs) => {
    if (!devs || devs.length === 0) return "Unknown Developer";
    return devs.substring(2, devs.length - 2);
  };

  return (
    <ClickAwayListener onClickAway={() => setClickedGameId(null)}>
      <div className="add_game_menu_container">
        <div className="add_game_menu">
          <div className="poster_and_details_container">
            <div className="game_poster_container">
              <img
                src={selectedGame.posterURL}
                alt={selectedGame.title}
                className="game_poster"
              />
              <div className="edit_image_game_poster" onClick={() => setEditMode(true)}>
                <div className="game_poster_edit_icon">
                  <EditIcon fontSize="small" />
                  Edit game
                </div>
              </div>
              <CustomizedRating
                onRating={handleRatingChange}
                rating={selectedGame?.rating || 0}
                size={"large"}
              />
            </div>

            <div className="game_details_container">
              <div className="add_game_menu_title">
                {editMode ? (
                  <input
                    type="text"
                    defaultValue={selectedGame.title}
                    onChange={(e) => handleEdit("title", e.target.value)}
                  />
                ) : (
                  selectedGame.title
                )}
              </div>

              <div className="add_game_menu_release add_game_menu_developer">
                <span className="release">
                  <span className="grey">Released on </span>
                  <span className="white">{selectedGame.release_date || "Unknown"}</span>
                </span>
                <div className="developers">
                  <span className="grey">Developed by: </span>
                  <span className="white">
                    {parseDevelopers(selectedGame.developers)}
                  </span>
                </div>
              </div>

              <div className="detailed_description">
                {editMode ? (
                  <textarea
                    id="description_select"
                    defaultValue={selectedGame.description}
                    placeholder="This game is one of the best roguelites..."
                    onChange={(e) => handleEdit("description", e.target.value)}
                  />
                ) : (
                  selectedGame.description || "No description available."
                )}
              </div>
            </div>
          </div>

          <div className="add_game_submit">
            <button className="delete_btn" onClick={handleDelete}>
              <DeleteForeverIcon fontSize="small" />
              Delete Game
            </button>
          </div>
        </div>
        {editMode && <div className="add_game_menu_misc">Edit mode</div>}
      </div>
    </ClickAwayListener>
  );
}

export default GameMenu;
