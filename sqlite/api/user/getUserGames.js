async function getUserGames(userDbAll){
    try {
    const rows = await userDbAll('SELECT * FROM games');
    console.log(`Fetched ${rows.length} rows from the games database.}`);
    return rows;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
}

module.exports.getUserGames = getUserGames;