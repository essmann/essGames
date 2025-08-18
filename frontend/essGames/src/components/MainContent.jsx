// components/MainContent.js
import React from 'react';
import GameGrid from "./GameGrid";
import FavoriteGrid from "./FavoriteGrid";

const MainContent = ({ selectedListItemIndex }) => {
  const renderContent = () => {
    switch (selectedListItemIndex) {
      case 0:
        return <GameGrid />;
      case 1:
        return <FavoriteGrid />;
      default:
        return null;
    }
  };

  return <div id="main-content">{renderContent()}</div>;
};

export default MainContent;