async function addUserGame(game, userDb){
     const { id, title, posterURL, rating, review, release_date, developers, detailed_description, genres } = game;

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO games (id, title, posterURL, rating, review, release_date, developers, detailed_description, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    userDb.run(query, [id, title, posterURL, rating, review, release_date, developers, detailed_description, genres], function (err) {
      if (err) {
        console.error('Failed to add game:', err);
        reject(err);
      } else {
        resolve({ success: true, id: this.lastID });
      }
    });
});
};

module.exports = addUserGame;