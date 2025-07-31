export const handleGetSteamgames = async () => {
    try {
      const games = await window.api.loadSteamGames(); // Or window.electronAPI.invoke('get-games')
      return games;
    } catch (error) {
      console.error("Failed to get steam games:", error);
    }
  };

  export default handleGetSteamgames;