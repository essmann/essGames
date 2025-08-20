import handleUpdateGame from "../database/user/handleUpdateGame";
const handleToggleFavorite = async (setIsFavorite, setGames, game) => {
  let newFavorite;

  setIsFavorite(prev => {
    newFavorite = !prev;
    console.log("I just set favorite");
    return newFavorite;
  });

  setGames(prev => {
    const updatedGame = { ...game, is_favorite: newFavorite };
    const exists = prev.some(g => g.id === game.id);
    return exists
      ? prev.map(g => (g.id === game.id ? updatedGame : g))
      : [...prev, updatedGame];
  });

  await handleUpdateGame({ ...game, is_favorite: newFavorite });
  logGame(game);
};


export const gameExists = (id, array) => {
  return array.some((game) => game.id === id);
};

export default handleToggleFavorite;

const logGame = (game) => {
    console.log("toggled favorite for this game: " + JSON.stringify({...game, posterURL: ""}));
}