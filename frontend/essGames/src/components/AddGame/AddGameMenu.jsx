import SearchGame from "./SearchGame";
import { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import FloatingActionButtonSize from "../FloatingActionButtonSize";
import { useGlobalContext } from "../../Context/useGlobalContext";
import handleGetPoster from "../../database/catalog/getPoster";
import openFileBase64 from "../../database/openFileBase64";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedRating from "../CustomizedRating";
import handleAddUserGame from "../../database/user/handleAddUserGame";
import generateUUID from "../../database/generateUUID";
import EditButton from "../EditButton";
function AddGameMenu({ selectedGame, setSelectedGame }) {
  const {
    setAddGameMenuIsDisplayed,
    addGameMenuIsDisplayed,
    games,
    setGames,
  } = useGlobalContext();

  const [posterUrl, setPosterUrl] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [userHasGame, setUserHasGame] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [formDetails, setFormDetails] = useState({
    date: "",
    developers: "",
    description: "",
    rating: 0,
    title: "",
  });

  useEffect(()=>{
    console.log(`Form details updated: ${JSON.stringify(formDetails)}`);
  },[formDetails])

  // Prefill form details when selectedGame is set
  useEffect(() => {
    if (selectedGame && selectedGame !== "edit") {
      setFormDetails({
        date: selectedGame.release_date || "",
        developers: selectedGame.developers || "",
        description: selectedGame.detailed_description || "",
        rating: selectedGame.rating || 0,
        title: selectedGame.title || "",
      });
    }
    if (selectedGame === "edit") {
      setFormDetails({
        date: "",
        developers: "",
        description: "",
        rating: 0,
        title: "",
      });
    }
  }, [selectedGame]);

  useEffect(() => {
    if (selectedGame) {
      setAddGameMenuIsDisplayed(true);
      const fetchPoster = async () => {
        try {
          const poster = await handleGetPoster(selectedGame.id);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setUserHasGame(games.some((g) => g.id === selectedGame?.id));
  }, [games, selectedGame]);

  useEffect(() => {
    setManualMode(selectedGame === "edit");
  }, [selectedGame]);

  const validateInput = () => {
    const { date, developers, description, title } = formDetails;
    if (!date || !developers || !description || !posterUrl || !title) {
      console.error("Fill all inputs in order to add the game.");
      return false;
    }
    return true;
  };

  const parseDevelopers = (developers) => {
    if (!developers || developers.length === 0) return "Unknown Developer";
    return developers.substring(2, developers.length - 2);
  };

  const truncateText = (text, maxWords) => {
    if (!text) return null;
    const words = text.split(" ").slice(0, maxWords);
    return words.join(" ") + "...";
  };

  const handleCloseMenu = () => {
    setSelectedGame(null);
    setAddGameMenuIsDisplayed(false);
  };

  const handleOpenFile = async () => {
    const image = await openFileBase64();
    if (image) setPosterUrl(image);
  };

  const handleFormChange = (field, value) => {
    console.log(`setting ${field} to ${value}`);
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (manualMode && !validateInput()) return;

    let _id = await generateUUID(); //random 128-bit ID
    const gameToAdd = {
      ...selectedGame,
      title: formDetails.title || selectedGame?.title || "Untitled",
      posterURL: posterUrl,
      rating: formDetails.rating || 0,
      release_date: manualMode ? formDetails.date : selectedGame.release_date,
      developers: manualMode ? formDetails.developers : selectedGame.developers,
      detailed_description: manualMode
        ? formDetails.description
        : selectedGame.detailed_description,
      id: _id,
    };

    if (manualMode || (!manualMode && !userHasGame)) {
      setGames((prevGames) => [...prevGames, gameToAdd]);
      await handleAddUserGame(gameToAdd);
    }
    else if(userHasGame){

    }

    setSelectedGame(null);
    setAddGameMenuIsDisplayed(false);
  };

  return (
    <>
      {addGameMenuIsDisplayed && (
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <div className="add_game_menu_container">
            <div className="add_game_menu">
              <div className="poster_and_details_container">
                <div className="game_poster_container">
                  {posterUrl ? (
                    <>
                      <EditImageButton onClick={handleOpenFile} />
                      <img
                        src={posterUrl}
                        alt="Game Poster"
                        className="game_poster"
                      />
                    </>
                  ) : (
                    <EmptyGamePoster onClick={handleOpenFile} />
                  )}
                    <div className="game_menu_game_details_footer">
                            <EditButton text={"Edit Game"}/>
                        <CustomizedRating
                          size="large"
                          value={formDetails.rating}
                          onRating={(v) => handleFormChange("rating", v)}
                        />
                    </div>
                </div>

                <div className="game_details_container">
                  <div className="add_game_menu_title">
                    {manualMode ? (
                      <input
                        type="text"
                        value={formDetails.title}
                        placeholder="Game title"
                        onChange={(e) =>
                          handleFormChange("title", e.target.value)
                        }
                      />
                    ) : (
                      formDetails.title
                    )}
                  </div>

                  <GameDetailsForm
                    manualMode={manualMode}
                    selectedGame={selectedGame}
                    formDetails={formDetails}
                    onChange={handleFormChange}
                    parse={parseDevelopers}
                  />

                  <GameDescription
                    manualMode={manualMode}
                    selectedGame={selectedGame}
                    formDetails={formDetails}
                    onChange={handleFormChange}
                    truncate={truncateText}
                  />
                </div>
              </div>

              <div className="add_game_submit">
                {!manualMode && <button>Edit game</button>}
                {!userHasGame && (
                  <button onClick={handleSubmit}>
                    <span>Add game</span>
                  </button>
                )}
              </div>
            </div>
            <div className="add_game_menu_misc">
              {manualMode && <div>Manual edit mode</div>}
              {posterUrl && <div>PosterUrl: true</div>}
              {selectedGame.id}
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

function EditImageButton({ onClick }) {
  return (
    <div className="edit_image_game_poster" onClick={onClick}>
      <div className="game_poster_edit_icon" onClick={onClick}>
        <EditIcon fontSize="small" />
        Edit image
      </div>
    </div>
  );
}

const GameDetailsForm = ({ manualMode, selectedGame, formDetails, onChange, parse }) => {
  return (
    <div className="add_game_menu_release add_game_menu_developer">
      <span className="release">
        <span className="grey">Released on </span>
        {manualMode ? (
          <input
            type="date"
            id="add_game_date"
            className="white"
            value={formDetails.date}
            onChange={(e) => onChange("date", e.target.value)}
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
            value={formDetails.developers}
            onChange={(e) => onChange("developers", e.target.value)}
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

const GameDescription = ({ manualMode, selectedGame, formDetails, onChange, truncate }) => {
  return (
    <div className="detailed_description">
      {manualMode ? (
        <textarea
          id="description_select"
          placeholder="This game is one of the best roguelites..."
          value={formDetails.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      ) : (
        truncate(selectedGame.detailed_description, 35) ||
        "No description available."
      )}
    </div>
  );
};

export default AddGameMenu;
