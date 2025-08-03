export const handleSearchGameCatalog = async (prefix) => {
  try {
    if (!prefix || prefix.trim() === "") {
      return []; // return empty array early if prefix is empty
    }
    const games = await window.api.searchGameCatalog(prefix);
    console.log("handle search games: " + games[0].name);
    console.log(JSON.stringify(games, null, 2)); // pretty-print with 2-space indent
    return games;
  } catch (error) {
    console.error("Failed to get games from catalog:", error);
    return []; // fallback empty array on error
  }
};

export default handleSearchGameCatalog;
