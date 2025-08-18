export const handleToggleFavorite = async (
  isFavorite,
  setIsFavorite,
  setGames,
  game
) => {
  //toggle state variable -> update local games array -> update the database with the new data.
  
  const newFavorite = !isFavorite; // use current state

  setIsFavorite(newFavorite);

  setGames((prev) => {
    const updatedGame = { ...game, is_favorite: newFavorite };
    const exists = prev.some((g) => g.id === game.id);
    if (exists) {
      return prev.map((g) => (g.id === game.id ? updatedGame : g));
    } else {
      return [...prev, updatedGame];
    }
  });

  await handleUpdateGame({ ...game, is_favorite: newFavorite });
};

export const gameExists = (id, array) => {
  return array.some((game) => game.id === id);
};

export default handleToggleFavorite;