export const handleUpdateGame = async (game) => {
    try {
      const gameUpdated = await window.api.updateGame(game);
      return gameUpdated;
    } catch (error){
      console.error("Failed to update game: ", error);
    }
  };

  export default handleUpdateGame;