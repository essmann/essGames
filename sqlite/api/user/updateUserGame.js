
async function updateUserGame(game, userDb){
    const { id, title, posterURL, rating, review, release_date, developers, detailed_description, genres } = game;
    console.log(JSON.stringify(game));
  return new Promise((resolve, reject) => {
    const query = `UPDATE games SET title = ?, posterURL = ?, rating = ?, review = ?, release_date = ?, developers = ?, detailed_description = ?, genres = ? WHERE id = ?`;
    userDb.run(query, [title, posterURL, rating, review, release_date, developers, detailed_description, genres, id], function (err) {
      if (err) {
        console.error('Failed to update game:', err);
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({ success: false, message: "Game not found" });
          console.log(`Game with ID: ${id} not found.`)
        } else {
          resolve({ success: true, message: "Game updated successfully" });
          console.log(`Game with title: ${title} updated successfully.`);
        }
      }
    }
  )})
    }

module.exports = updateUserGame