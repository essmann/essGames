import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import CustomizedRating from "./CustomizedRating";

const handleFileOpen = async (setFilePath) => {
  try {
    const dataUrl = await window.electronAPI.openFile(); // Get Data URL from main process
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

function GameMenu({ setAddGameMenuIsDisplayed }) {

  return (
    <ClickAwayListener >
        <div className="game_add_menu game_menu">
            test
        </div>

    </ClickAwayListener>
  );
}

export default GameMenu;
