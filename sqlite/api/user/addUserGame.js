async function addUserGame(game, userDb, USER_GAMES_COLUMN_NAMES){
    
    const { id, title, posterURL, rating, review, release_date, developers, detailed_description, genres } = game;
        const questionMarks = USER_GAMES_COLUMN_NAMES.split(",").map(()=>"?").join(",");
        console.log(questionMarks);
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO games (${USER_GAMES_COLUMN_NAMES}) VALUES (${questionMarks})`;
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