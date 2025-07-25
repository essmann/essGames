export const handleAddGame = async (game) => {
    try {
      const gameAdded = await window.api.addGame(game);
      return gameAdded;
    } catch (error){
      console.error("Failed to add game: ", error);
    }
  };

  export default handleAddGame;