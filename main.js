const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
let csvToJson = require('convert-csv-to-json');
const csv = require('csv-parser');
const { v4: uuidv4 } = require("uuid");
const createConnections = require('./sqlite/connections/dbConnections.js');
const util = require('util');
const {getUserGames} = require("./sqlite/api/user/getUserGames.js");
const addUserGame = require("./sqlite/api/user/addUserGame.js");
const updateUserGame = require("./sqlite/api/user/updateUserGame.js");
const deleteUserGame = require("./sqlite/api/user/deleteUserGame.js");
const searchCatalogGames = require("./sqlite/api/catalog/searchCatalogGames.js");
const getCatalogPoster = require("./sqlite/api/catalog/getCatalogPoster.js");
let win;
const isDev = !app.isPackaged;
// const isDev = true;
const dbPath = isDev
  ? path.join(__dirname, 'sqlite', 'games.db')
  : path.join(process.resourcesPath, 'app.asar.unpacked', 'sqlite', 'games.db');

const gameCatalogDbPath = isDev
  ? path.join(__dirname, 'sqlite', 'allGames.db')
  : path.join(process.resourcesPath, 'app.asar.unpacked', 'sqlite', 'allGames.db');

const { userDb, gameCatalogDb, userDbAll, gameCatalogDbAll } = createConnections(dbPath, gameCatalogDbPath);
var USER_GAMES_ROWS = null;
const openFile = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: 'Open Image',
    buttonLabel: 'Open',
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'] }
    ]
  })

  if (canceled || filePaths.length === 0) {
    return null
  }

  const filePath = filePaths[0]
  const fileBuffer = fs.readFileSync(filePath)
  const ext = filePath.split('.').pop().toLowerCase()
  const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`
  const dataUrl = `data:${mimeType};base64,${fileBuffer.toString('base64')}`

  return dataUrl
}





ipcMain.handle('generate-uuid',  () => {
  return uuidv4();
})
// IPC handler to expose openFile to renderer
ipcMain.handle('open-image-file', async () => {
  return await openFile();
})

ipcMain.handle('get-catalog-poster', async (event, id) => {
  return await getCatalogPoster(id, gameCatalogDbAll);
});
ipcMain.handle('get-user-games', async ()=>{
  return await getUserGames(userDbAll);
})

ipcMain.handle('add-game', async (event, game) => {
  return await addUserGame(game, userDb);
})

ipcMain.handle('update-game', async (event, game)=>{
    return await updateUserGame(game, userDb);
})

ipcMain.handle('delete-game', async (event, id) => {
  return await deleteUserGame(id, userDb);
});

ipcMain.handle('search-games-catalog', async (event, prefix) =>{
  return await searchCatalogGames(prefix, gameCatalogDbAll);
});
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173/')

  }
  else {
    win.loadFile('./build/dist/index.html');
  }
}



app.whenReady().then(createWindow).then(()=>{
    const query = `PRAGMA table_info(games);`;

    userDb.all(query, (err, rows) => {
      if (err) {
        console.error('Error running query:', err);
        userDb.close();
        return;
      }
      const columns = rows.map(row => row.name);
      console.log('Columns in games table:', columns);
    });

});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
