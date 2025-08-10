async function updateUserGame(game, userDb, USER_GAMES_COLUMN_NAMES) {
  return new Promise((resolve, reject) => {
    // Columns as array, excluding "id" because it's for WHERE clause
    const columns = USER_GAMES_COLUMN_NAMES.split(",").filter(col => col !== "id");
    
    // Build "col1 = ?, col2 = ?, ..." for SET clause dynamically
    const setClause = columns.map(col => `${col} = ?`).join(", ");

    // Collect values from game object in the order of columns
    const values = columns.map(col => game[col]);

    // Append id for WHERE
    values.push(game.id);

    // Prepare query
    const query = `UPDATE games SET ${setClause} WHERE id = ?`;

    userDb.run(query, values, function(err) {
      if (err) {
        console.error('Failed to update game:', err);
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({ success: false, message: "Game not found" });
          console.log(`Game with ID: ${game.id} not found.`);
        } else {
          resolve({ success: true, message: "Game updated successfully" });
          console.log(`Game with id: ${game.id} updated successfully.`);
        }
      }
    });
  });
}

module.exports = updateUserGame;
