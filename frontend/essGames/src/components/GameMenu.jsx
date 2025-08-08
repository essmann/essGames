import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useGlobalContext } from "../Context/useGlobalContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import handleDeleteGame from "../database/user/handleDeleteGame";
import CustomizedRating from "./CustomizedRating";
import handleUpdateGame from "../database/user/handleUpdateGame";
import { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditButton from "./EditButton";
function GameMenu() {
  const { clickedGameId, setClickedGameId, games, setGames } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState(games.find((game) => (game.id || game.AppID) == clickedGameId))
  const [editDetails, setEditDetails] = useState({
    title: selectedGame.title || "",
    detailed_description: selectedGame.detailed_description || "",
    developers: selectedGame.developers || "",
    release_date: selectedGame.release_date || "",
    rating: selectedGame.rating || 0
  });
  const [originalDetails, setOriginalDetails] = useState(null);
  const [titleCleared, setTitleCleared] = useState(false);
  const titleRef = useRef(null);

  const truncateText = (text, maxWords) => {
    if (!text) return null;
    const words = text.split(" ").slice(0, maxWords);
    return words.join(" ") + "...";
  };

  // const selectedGame = games.find((game) => (game.id || game.AppID) == clickedGameId);
  if (!selectedGame) return null;

  useEffect(() => {
    if (selectedGame) {
      const initialDetails = {
        title: selectedGame.title || "",
        detailed_description: selectedGame.detailed_description || selectedGame.detailed_description || "",
        developers: selectedGame.developers || "",
        release_date: selectedGame.release_date || "",
        rating: selectedGame.rating || 0,
      };
      setEditDetails(initialDetails);
      setOriginalDetails(initialDetails);
    }
  }, [selectedGame]);

  useEffect(() => {
    if (editMode && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editMode]);

  const handleDelete = async () => {
    try {
      setGames((prevGames) => prevGames.filter((game) => game.id !== clickedGameId));
      setClickedGameId(null);
      await handleDeleteGame(clickedGameId);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleEditChange = (key, value) => {
    setEditDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleRatingChange = async (value) => {
    setGames((prevGames) =>
      prevGames.map((g) => (g.id === selectedGame.id ? { ...g, rating: value } : g))
    );
    const updatedGame = { ...selectedGame, rating: value };
    setSelectedGame(updatedGame);
    await handleUpdateGame(updatedGame);
  };

  const handleCancel = () => {
    setEditDetails(originalDetails);
    setEditMode(false);
    setTitleCleared(false);
  };

  const handleSave = async () => {
    const updatedGame = { ...selectedGame, ...editDetails };
    console.log(updatedGame);
    setGames((prevGames) =>
      prevGames.map((g) => (g.id === selectedGame.id ? updatedGame : g))
    );
    await handleUpdateGame(updatedGame);
    setEditMode(false);
    setTitleCleared(false);
  };

  const editableStyle = editMode ? { opacity: 0.8, borderBottom: "1px dotted gray" } : {};

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
              

              <div className="game_menu_game_details_footer">
                            <EditButton text={"Edit Game"} onClick={()=>setEditMode(true)}/>
                        <CustomizedRating
                           onRating={handleRatingChange}
                rating={ selectedGame.rating}
                size={"large"}
                        />
                    </div>
              
            </div>

            <div className="game_details_container">
              <div
                className="add_game_menu_title"
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                ref={titleRef}
                onFocus={() => {
                  if (editMode && !titleCleared) {
                    setEditDetails((prev) => ({ ...prev, title: "" }));
                    setTitleCleared(true);
                  }
                }}
                onBlur={(e) => handleEditChange("title", e.target.innerText)}
                style={editableStyle}
              >
                {editDetails.title}
              </div>

              <div className="add_game_menu_release add_game_menu_developer">
                <span className="release">
                  <span className="grey">Released on </span>
                  <span
                    className="white"
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleEditChange("release_date", e.target.innerText)}
                    style={editableStyle}
                  >
                    {editDetails.release_date || "Unknown"}
                  </span>
                </span>
                <div className="developers">
                  <span className="grey">Developed by: </span>
                  <span
                    className="white"
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleEditChange("developers", e.target.innerText)}
                    style={editableStyle}
                  >
                    {editDetails.developers || "Unknown Developer"}
                  </span>
                </div>
              </div>

              <div
                className="detailed_description"
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEditChange("detailed_description", e.target.innerText)}
                style={editableStyle}
              >
                {editDetails.detailed_description
                  ? truncateText(editDetails.detailed_description, 50)
                  : "No description available."}
              </div>
            </div>
          </div>

          <div className="add_game_submit">
            <button className="delete_btn" onClick={handleDelete}>
              <DeleteForeverIcon fontSize="small" />
              Delete Game
            </button>

            {editMode && (
              <>
                <button className="save_btn" onClick={handleSave}>
                  ✅ Save Changes
                </button>
                <button className="cancel_btn" onClick={handleCancel}>
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>
        {editMode && <div className="add_game_menu_misc">Edit mode</div>}
      </div>
    </ClickAwayListener>
  );
}

export default GameMenu;
