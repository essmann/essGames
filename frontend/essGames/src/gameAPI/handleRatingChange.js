import handleUpdateGame from "../database/user/handleUpdateGame";
/**
 * Does something nifty.
 *
 * @param   setRating  The state variable used to display and set rating.
 * @param setGames The state function used to update all games.
 * @param game The game object which will be updated with the new rating. This will replace the game with the same ID in the games array.
 * @param rating The new rating for the game.
 * @returns void.
 */
const handleRatingChange = async (setRating, setGames, game, rating) => {

  setRating(rating);

  setGames(prev => {
    const updatedGame = { ...game, rating: rating };
    const exists = prev.some(g => g.id === game.id);
    return exists
      ? prev.map(g => (g.id === game.id ? updatedGame : g))
      : [...prev, updatedGame];
  });

  await handleUpdateGame({ ...game, rating: rating });
  logGame(game);
};


export const gameExists = (id, array) => {
  return array.some((game) => game.id === id);
};

export default handleRatingChange;

const logGame = (game) => {
    console.log("Rating changed for this game: " + JSON.stringify({...game, posterURL: ""}));
}