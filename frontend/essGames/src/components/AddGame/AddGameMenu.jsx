import SearchGame from "./SearchGame";
import { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import FloatingActionButtonSize from "../FloatingActionButtonSize";
import { useGlobalContext } from "../../Context/useGlobalContext";
import handleGetPoster from "../../database/getPoster";
import openFileBase64 from "../../database/openFileBase64";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedRating from "../CustomizedRating";

function AddGameMenu() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { setAddGameMenuIsDisplayed } = useGlobalContext();
  const [posterUrl, setPosterUrl] = useState(null);
  const [rating, setRating] = useState(selectedGame?.rating|| 0);
  const parseDevelopers = (developers) => {
    if (!developers || developers.length === 0) return "Unknown Developer";
    return developers.substring(2, developers.length - 2);
  };
 const handleRatingChange = async (value) => {
    console.log("rating changed:", value);

    // 1️⃣ Update local rating
    setRating(value);

  };
  const truncateText = (text, maxWords) => {
    if (!text) return null;
    const words = text.split(" ").slice(0, maxWords);
    return words.join(" ") + "...";
  };

  useEffect(() => {
    if (selectedGame && selectedGame !== "custom") {
      setAddGameMenuIsDisplayed(true);
      const fetchPoster = async () => {
        try {
          const poster = await handleGetPoster(selectedGame.AppID);
          setPosterUrl(poster || null);
        } catch (err) {
          console.error("Failed to fetch poster:", err);
          setPosterUrl(null);
        }
      };
      fetchPoster();
    } else {
      setPosterUrl(null);
    }
  }, [selectedGame]);

  const handleCloseMenu = () => {
    setSelectedGame(null);
    setAddGameMenuIsDisplayed(false);
  };

  const handleOpenFile = async () => {
    const image = await openFileBase64();
    if (image) setPosterUrl(image);
  };

  return (
    <>
      <SearchGame setSelectedGame={setSelectedGame} />

      {selectedGame && selectedGame !== "custom" && (
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <div className="add_game_menu_container">
            <div className="add_game_menu">
              <div className="poster_and_details_container">
                {posterUrl ? (
                  <div className="game_poster_container">
                    <div
                      className="edit_image_game_poster"
                      onClick={handleOpenFile}
                    >
                      <div
                        className="game_poster_edit_icon"
                        onClick={handleOpenFile}
                      >
                        <EditIcon fontSize="small" />
                        Edit image
                      </div>
                    </div>

                    <img
                      src={posterUrl}
                      alt="Game Poster"
                      className="game_poster"
                    />
                    <CustomizedRating/>
                  </div>
                ) : (
                  <EmptyGamePoster onClick={handleOpenFile} />
                )}
                <div className="game_details_container">
                  <div className="add_game_menu_title">{selectedGame.name}</div>
                  <div className="add_game_menu_release add_game_menu_developer">
                    <span className="release">
                      <span className="grey">Released on </span>
                      <span id="release_date_span" className="white">
                        {selectedGame.release_date}
                      </span>
                    </span>
                    <div className="developers">
                      <span className="grey">Developed by: </span>
                      <span id="developed_by_right" className="white">
                        {parseDevelopers(selectedGame.developers)}
                      </span>
                    </div>
                  </div>
                  <div className="detailed_description">
                    {truncateText(selectedGame.detailed_description, 35) ||
                      "No description available."}
                  </div>
                </div>
              </div>

              <div className="add_game_submit">
                <button>Add Game</button>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}

function EmptyGamePoster({ onClick }) {
  return (
    <div className="game_card_add" id="game_poster_add" onClick={onClick}>
      <FloatingActionButtonSize />
      <div className="game_card_title"></div>
    </div>
  );
}

export default AddGameMenu;
