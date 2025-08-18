async function updateUserGame(game, userDb) {
  const { id, title, posterURL, rating, review, release_date, developers, detailed_description, genres, is_favorite } = game;

  return new Promise((resolve, reject) => {
    const query = `
      UPDATE games 
      SET title = ?, posterURL = ?, rating = ?, review = ?, release_date = ?, developers = ?, detailed_description = ?, genres = ?, is_favorite = ?
      WHERE id = ?
    `;

    userDb.run(
      query,
      [
        title,
        posterURL,
        rating,
        review,
        release_date,
        JSON.stringify(developers),
        detailed_description,
        JSON.stringify(genres),
        is_favorite,
        id
      ],
      function(err) {
        if (err) {
          console.error('Failed to update game:', err);
          reject(err);
        } else {
          if (this.changes === 0) {
            console.log(`Game with ID: ${id} not found.`);
            resolve({ success: false, message: "Game not found" });
          } else {
            console.log(`Game with title: ${title} updated successfully.`);
            resolve({ success: true, message: "Game updated successfully" });
          }
        }
      }
    );
  });
}

module.exports = updateUserGame;
