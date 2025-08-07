import SearchGame from "./SearchGame";
import { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import FloatingActionButtonSize from "../FloatingActionButtonSize";
import { useGlobalContext } from "../../Context/useGlobalContext";
import handleGetPoster from "../../database/getPoster";
import openFileBase64 from "../../database/openFileBase64";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedRating from "../CustomizedRating";
import { useRef } from "react";
function AddGameMenu() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { setAddGameMenuIsDisplayed, games, setGames } = useGlobalContext();
  const [posterUrl, setPosterUrl] = useState(null);
  const [rating, setRating] = useState(selectedGame?.rating || 0);
  const dateRef = useRef(null);
  const developesRef = useRef(null);
  const [manualMode, setManualMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDevelopers, setSelectedDevelopers] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const [userHasGame, setUserHasGame] = useState(false);



  //The menu should be in 3 major states
    // 1) Manual edit mode -- where the user has selected a custom game 
    // 2) Existing game -- where the user may choose to EDIT the game 
    // 3) Existing game -- where the user already has this game added in his/her collection, where only edit is possible.
  useEffect(() => {
    setUserHasGame(games.some((g) => g.AppID === selectedGame?.AppID));
  }, [games, selectedGame]);

  useEffect(() => {
    if (selectedGame == "edit") {
      setManualMode(true);
    } else {
      setManualMode(false);
    }
  }, [selectedGame]);

  useEffect(() => {
    console.log(selectedDevelopers);
    console.log(selectedDate);
    console.log(selectedDescription);
  });
  const validateInput = () => {
    if (
      !selectedDate ||
      !selectedDevelopers ||
      !selectedDescription ||
      !posterUrl
    ) {
      console.error("Fill all inputs in order to add the game.");
      return false;
    }
    return true;
  };

  const parseDevelopers = (developers) => {
    if (!developers || developers.length === 0) return "Unknown Developer";
    return developers.substring(2, developers.length - 2);
  };
  const handleRatingChange = async (value) => {
    console.log("rating changed:", value);

    // 1️⃣ Update local rating
    setRating(value);

    //if game already exists, update it in the UI within the games state.
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

  const handleAddGame = () => {
    if (manualMode && validateInput()) {
    } else if (!manualMode) {
      //update existing game
    }
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
                    <EditImageButton onClick={handleOpenFile} />
                    <img
                      src={posterUrl}
                      alt="Game Poster"
                      className="game_poster"
                    />
                    <CustomizedRating size={"large"} />
                  </div>
                ) : (
                  <>
                    <div className="game_poster_container">
                      <EmptyGamePoster onClick={handleOpenFile} />
                      <CustomizedRating />
                    </div>
                  </>
                )}
                <div className="game_details_container">
                  <div className="add_game_menu_title">{selectedGame.name}</div>
                  <GameDetailsForm
                    manualMode={manualMode}
                    selectedGame={selectedGame}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedDevelopers={selectedDevelopers}
                    setSelectedDevelopers={setSelectedDevelopers}
                    parse={parseDevelopers}
                  />
                  <GameDescription
                    selectedDescription={selectedDescription}
                    selectedGame={selectedGame}
                    setSelectedDescription={setSelectedDescription}
                    manualMode={manualMode}
                    truncate={truncateText}
                  />
                </div>
              </div>

              <div className="add_game_submit">
                  {!manualMode && <button>Edit game </button>}

                  {!userHasGame && <button onClick={handleAddGame}>
                                      <span>{"Add game"}</span>
                                  </button>
                }

              </div>
            </div>
            {manualMode ? (
              <div> Generated GUID: 5531</div>
            ) : (
              <div> Game ID: 51234</div>
            )}
            {posterUrl && <div> PosterUrl: true</div>}
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}

function EmptyGamePoster({ onClick, children }) {
  return (
    <>
      <div className="game_card_add" id="game_poster_add" onClick={onClick}>
        <FloatingActionButtonSize />
        <div className="game_card_title"></div>
      </div>
    </>
  );
}

function EditImageButton({ onClick }) {
  return (
    <>
      <div className="edit_image_game_poster" onClick={onClick}>
        <div className="game_poster_edit_icon" onClick={onClick}>
          <EditIcon fontSize="small" />
          Edit image
        </div>
      </div>
    </>
  );
}

const GameDetailsForm = ({
  selectedGame,
  manualMode,
  selectedDate,
  setSelectedDate,
  selectedDevelopers,
  setSelectedDevelopers,
  parse,
}) => {
  return (
    <div className="add_game_menu_release add_game_menu_developer">
      <span className="release">
        <span className="grey">Released on </span>
        {manualMode ? (
          <input
            type="date"
            id="add_game_date"
            className="white"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        ) : (
          <span id="release_date_span" className="white">
            {selectedGame.release_date}
          </span>
        )}
      </span>
      <div className="developers">
        <span className="grey">Developed by: </span>
        {manualMode ? (
          <input
            type="text"
            id="select_developer"
            placeholder="Developer..."
            onChange={(e) => setSelectedDevelopers(e.target.value)}
          />
        ) : (
          <span id="developed_by_right" className="white">
            {parse(selectedGame.developers)}
          </span>
        )}
      </div>
    </div>
  );
};

const GameDescription = ({
  selectedGame,
  selectedDescription,
  setSelectedDescription,
  manualMode,
  truncate,
}) => {
  return (
    <div className="detailed_description">
      {!manualMode ? (
        truncate(selectedGame.detailed_description, 35) ||
        "No description available."
      ) : (
        <textarea
          id="description_select"
          placeholder="This game is one of the best roguelites..."
          onChange={(e) => setSelectedDescription(e.target.value)}
        />
      )}
    </div>
  );
};
export default AddGameMenu;
