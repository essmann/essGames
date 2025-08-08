import SearchGame from "./SearchGame";
import { useState, useEffect, useRef } from "react";
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
import handleUpdateGame from "../../database/user/handleUpdateGame";
import JsonComponent from "../JsonComponent";
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
  const [editMode, setEditMode] = useState(false);
  const [titleCleared, setTitleCleared] = useState(false);
  const titleRef = useRef(null);

  const [formDetails, setFormDetails] = useState({
    date: "",
    developers: "",
    description: "",
    rating: 0,
    title: "",
    genres: "",
  });

  const [originalDetails, setOriginalDetails] = useState(null);

  useEffect(() => {
    console.log(`Form details updated: ${JSON.stringify(formDetails)}`);
  }, [formDetails]);

  // Prefill form details when selectedGame is set
  useEffect(() => {
    if (selectedGame && selectedGame !== "edit") {
      const initialDetails = {
        date: selectedGame.release_date || "",
        developers: selectedGame.developers || "",
        description: selectedGame.detailed_description || "",
        rating: selectedGame.rating || 0,
        title: selectedGame.title || "",
        genres: selectedGame.genres || ""
      };
      setFormDetails(initialDetails);
      setOriginalDetails(initialDetails);
    }
    if (selectedGame === "edit") {
      setFormDetails({
        date: "",
        developers: "",
        description: "",
        rating: 0,
        title: "",
      });
      setOriginalDetails(null);
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

  useEffect(() => {
    if ((manualMode || editMode) && titleRef.current) {
      titleRef.current.focus();
    }
  }, [manualMode, editMode]);

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
    setEditMode(false);
  };

  const handleOpenFile = async () => {
    const image = await openFileBase64();
    if (image) setPosterUrl(image);
  };

  const handleFormChange = (field, value) => {
    console.log(`setting ${field} to ${value}`);
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleRatingChange = async (value) => {
    setFormDetails((prev) => ({ ...prev, rating: value }));
    if (selectedGame) {
      const updatedGame = { ...selectedGame, rating: value };
      setGames((prevGames) =>
        prevGames.map((g) => (g.id === selectedGame.id ? updatedGame : g))
      );
      await handleUpdateGame(updatedGame);
    }
  };

  const handleCancel = () => {
    if (originalDetails) {
      setFormDetails(originalDetails);
    }
    setEditMode(false);
    setTitleCleared(false);
  };

  const handleSave = async () => {
    if (!editMode) return;
    
  }
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
    } else if (userHasGame) {
      // This is the save logic for editing an existing game
      const updatedGame = {
        ...selectedGame,
        ...formDetails,
        release_date: formDetails.date,
        detailed_description: formDetails.description,
        posterURL: posterUrl,
      };
      setGames((prevGames) =>
        prevGames.map((g) => (g.id === selectedGame.id ? updatedGame : g))
      );
      await handleUpdateGame(updatedGame);
    }

    setSelectedGame(null);
    setAddGameMenuIsDisplayed(false);
    setEditMode(false);
  };

  const editableStyle = manualMode || editMode ? { opacity: 0.8, borderBottom: "1px dotted gray" } : {};

  var testMode = true;
  return (
    <>
      {addGameMenuIsDisplayed && (
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <div className="add_game_menu_container">
            
            
            <div className="add_game_menu">
              <JsonComponent object={formDetails}/>
              <div className="poster_and_details_container">
                <div className="game_poster_container">
                  {posterUrl ? (
                    <>
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
                    <EditButton text={"Edit Game"} onClick={() => setEditMode(true)} />
                    <CustomizedRating
                      size="large"
                      value={formDetails.rating}
                      onRating={(v) => handleRatingChange(v)}
                    />
                  </div>
                </div>

                <div className="game_details_container">
                  <div
                    className="add_game_menu_title"
                    contentEditable={manualMode || editMode}
                    suppressContentEditableWarning={true}
                    ref={titleRef}
                    onFocus={() => {
                      if ((manualMode || editMode) && !titleCleared) {
                        setFormDetails((prev) => ({ ...prev, title: "" }));
                        setTitleCleared(true);
                      }
                    }}
                    onBlur={(e) => handleFormChange("title", e.target.innerText)}
                    style={editableStyle}
                  >
                    {formDetails.title}
                  </div>

                  <GameDetailsForm
                    manualMode={manualMode || editMode}
                    selectedGame={selectedGame}
                    formDetails={formDetails}
                    onChange={handleFormChange}
                    parse={parseDevelopers}
                    editableStyle={editableStyle}
                  />

                  <GameDescription
                    manualMode={manualMode || editMode}
                    selectedGame={selectedGame}
                    formDetails={formDetails}
                    onChange={handleFormChange}
                    truncate={truncateText}
                    editableStyle={editableStyle}
                  />
                  
                </div>
              </div>

              <div className="add_game_submit">
                {!manualMode && !editMode && userHasGame && (
                  <button onClick={() => setEditMode(true)}>Edit Game</button>
                )}
                {!userHasGame && (
                  <button onClick={handleSubmit}>
                    <span>Add game</span>
                  </button>
                )}
                {(manualMode || editMode) && (
                  <GameMenuFooterButtons handleSubmit={handleSubmit} handleCancel={handleCancel} editMode={editMode}/>
                )}
              </div>
            </div>
            <div className="add_game_menu_misc">
              {(manualMode || editMode) && <div>Manual edit mode</div>}
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

const GameDetailsForm = ({ manualMode, selectedGame, formDetails, onChange, parse, editableStyle }) => {
  return (
    <div className="add_game_menu_release add_game_menu_developer">
      <span className="release">
        <span className="grey">Released on </span>
        <span
          className="white"
          contentEditable={manualMode}
          suppressContentEditableWarning={true}
          onBlur={(e) => onChange("date", e.target.innerText)}
          style={editableStyle}
        >
          {formDetails.date}
        </span>
      </span>
      <div className="developers">
        <span className="grey">Developed by: </span>
        <span
          className="white"
          contentEditable={manualMode}
          suppressContentEditableWarning={true}
          onBlur={(e) => onChange("developers", e.target.innerText)}
          style={editableStyle}
        >
          {manualMode ? formDetails.developers : parse(selectedGame.developers)}
        </span>
      </div>
    </div>
  );
};

const GameDescription = ({ manualMode, selectedGame, formDetails, onChange, truncate, editableStyle }) => {
  return (
    <div className="detailed_description">
      <span
        contentEditable={manualMode}
        suppressContentEditableWarning={true}
        onBlur={(e) => onChange("description", e.target.innerText)}
        style={editableStyle}
      >
        {manualMode
          ? truncate(formDetails.description, 35)
          : truncate(selectedGame.detailed_description, 35) ||
            "No description available."}
      </span>
    </div>
  );
};

export default AddGameMenu;

 const GameMenuFooterButtons = ({handleSubmit, handleCancel, editMode}) => {
    return (
      <div className="add_game_submit">
            

            {editMode && (
              <>
                <button className="cancel_btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save_btn" onClick={handleSave}>
                  Save changes
                </button>
              </>
            )}
          </div>
    )
}