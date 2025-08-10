const sqlite3 = require('sqlite3').verbose();

function createConnections(dbPath, gameCatalogDbPath) {
  const userDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(`Error opening database: ${dbPath}`, err.message);
    } else {
      console.log(`Connected to SQLite database: ${dbPath}`);
    }
  });

  const gameCatalogDb = new sqlite3.Database(gameCatalogDbPath, (err) => {
    if (err) {
      console.error(`Error opening database: ${gameCatalogDbPath}`, err.message);
    } else {
      console.log(`Connected to SQLite catalog database: ${gameCatalogDbPath}`);
    }
  });

  return { userDb, gameCatalogDb };
}

module.exports = createConnections;
