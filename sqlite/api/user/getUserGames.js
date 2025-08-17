async function getUserGames(userDbAll){
    try {
    const rows = await userDbAll('SELECT * FROM games');
    console.log(`Fetched ${rows.length} rows from the games database. Rows : ${JSON.stringify(rows)}`)
    // Map rows to truncate posterURL
    const truncatedRows = rows.map(game => ({
      ...game,
      posterURL: game.posterURL ? game.posterURL.substring(0, 30) + '...' : null // truncate to 30 chars
    }));

    // Print JSON
    console.log(JSON.stringify(truncatedRows, null, 2));
    
    return rows;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
}

module.exports.getUserGames = getUserGames;