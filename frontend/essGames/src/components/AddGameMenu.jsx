import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import CustomizedRating from "./CustomizedRating";
import { useRef } from "react";
import generateGuidInteger from "../database/generateGuidInteger";
import handleAddGame from "../database/handleAddGame";
const handleFileOpen = async (setFilePath) => {
  try {
    const dataUrl = await window.api.openImageFile() // Get Data URL from main process
    if (dataUrl) {
      setFilePath(dataUrl); // Set the Data URL as the src for the image
      console.log(dataUrl); // Log the Data URL for debugging
    } else {
      setFilePath("No file selected");
    }
  } catch (error) {
    console.error("Failed to open file:", error);
  }
};

// Usage example:
// handleGetGames().then((games) => {
//   console.log(games);
// });


function AddGameMenu({ setAddGameMenuIsDisplayed, setGames }) {
  const [filePath, setFilePath] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);

  const addGame = () => {
                if(!validateInput){return;}
                const title = titleRef.current.value;
                const id = generateGuidInteger();
                const game = {id: id, posterURL: filePath, rating: rating, review: "", title: title}
                handleAddGame(game).then(()=>{
                  setGames(prevGames => [...prevGames, game]);
                })

  }
  const validateInput = () => {
    return title !== null && id !== null && filePath !== null;
  }
  return (
    <ClickAwayListener onClickAway={() => setAddGameMenuIsDisplayed(false)}>
      <div className="game_add_menu">
        {filePath && filePath !== "No file selected" ? (
          <>
            <img
              src={filePath}
              className="game_add_menu_poster image_added"
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <div>
              
              <div className="game_add_menu_title_input add_info">
                <div className="game_add_menu_title_label add_info">Game Title:</div>
                <input type="text" ref={titleRef}/>
              </div>
              <div className="game_add_menu_rating">
                <div className="game_add_menu_rating_label add_info">Your Rating:</div>
                <div id="star_container_add">
                    <CustomizedRating onRating={(value)=>setRating(value)}/>
                </div>
              </div>
               <button className="game_add_menu_submit_btn" onClick={()=>{
                addGame();
            }}>
               Submit </button>
              
            </div>
            
            
          </>
        ) : (
          <>
          <div className="game_add_menu_poster image_empty">
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => handleFileOpen(setFilePath)}
              >
                <AddIcon />
              </Fab>
            </Box>
            
          </div>
          <div>
              
              <div className="game_add_menu_title_input add_info">
                <div className="game_add_menu_title_label add_info">Game Title:</div>
                <input type="text" ref={titleRef}/>
              </div>
              <div className="game_add_menu_rating">
                <div className="game_add_menu_rating_label add_info">Your Rating:</div>
                <div id="star_container_add">
                   <CustomizedRating onRating={(value)=>setRating(value)}/>
                </div>
              </div>
            <button className="game_add_menu_submit_btn" onClick={()=>{
              addGame();
            }}>
               Submit </button>
            </div>
            
          </>
          
          
        )}
      </div>
    </ClickAwayListener>
  );
}

export default AddGameMenu;
