async function searchCatalogGames(prefix, gameCatalogDbAll){
      try {
    // Query games starting with prefix (case-insensitive)
    const sql = `SELECT * FROM games WHERE title LIKE ? LIMIT 100`;
    const rows = await gameCatalogDbAll(sql, [`${prefix}%`]);
    console.log(`Found ${rows.length} games starting with '${prefix}'`);
    return rows;
  } catch (err) {
    console.error('DB search error:', err);
    throw err;
  }

}

module.exports = searchCatalogGames;