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
import { SnackbarContext } from "../../Context/SnackbarContext";
import { useContext } from "react";
import MenuContainer from "../MenuContainer";
function AddGameMenu({ selectedGame, setSelectedGame }) {
  const { setAddGameMenuIsDisplayed, addGameMenuIsDisplayed, games, setGames } =
    useGlobalContext();
  const { setGameAdded } = useContext(SnackbarContext);

  
  return (
    <MenuContainer>
      <div>Hello</div>
    </MenuContainer>
  );
}

export default AddGameMenu;