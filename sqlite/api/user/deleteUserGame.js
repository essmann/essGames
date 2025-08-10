function deleteUserGame(id, userDb) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM games WHERE id = ?`;
    userDb.run(query, [id], function (err) {
      if (err) {
        console.error('Failed to delete game:', err);
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({ success: false, message: "Game not found" });
        } else {
          resolve({ success: true, message: `Game ${id} deleted successfully`});
        }
      }
    });
  });
}

module.exports = deleteUserGame;
