export const handleDeleteGame = async (id) => {
    try {
      const gameDeleted = await window.api.deleteGame(id);
      return gameDeleted;
    } catch (error){
      console.error("Failed to delete game: ", error);
    }
  };

  export default handleDeleteGame;