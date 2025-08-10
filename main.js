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
function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}



// const userDb = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to SQLite database.');
//   }
// });
// const gameCatalogDb = new sqlite3.Database(gameCatalogDbPath, (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to SQLite catalog database.');
//   }
// });
async function loadSteamGames(filePath) {

  try {
    const data = await readCsv(filePath);
    console.log("Data loaded");
    return data;
  } catch (err) {
    console.error("Error loading data:", err);
  }
}


// const userDbAll = util.promisify(userDb.all.bind(userDb));
// const gameCatalogDbAll = util.promisify(gameCatalogDb.all.bind(gameCatalogDb));

// ipcMain.handle('update-catalog', async (id) =>{
   
  
// } )
ipcMain.handle('generate-uuid',  () => {
  return uuidv4();
})
// IPC handler to expose openFile to renderer
ipcMain.handle('open-image-file', async () => {
  return await openFile();
})

ipcMain.handle('get-poster', async (event, id) => {
  try {
    const blob_image = await gameCatalogDbAll('SELECT image FROM posters WHERE id = ?', [id]);

    if (blob_image.length === 0 || !blob_image[0].image) {
      console.warn(`No image found for ID ${id}`);
      return null;
    }

    // Detect image type (optional, or default to e.g., "image/jpeg")
    const mimeType = 'image/jpeg'; // or 'image/png', depending on your actual image format
    const base64Image = blob_image[0].image.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    console.log(`Fetched and encoded image for ID ${id}`);
    return dataUrl;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
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

ipcMain.handle('search-all-games', async (event, prefix) => {
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


const test = async (prefix) => {
  try {
    // Query games starting with prefix (case-insensitive)
    const sql = `SELECT * FROM games WHERE title LIKE ? LIMIT 100`;
    const rows = await gameCatalogDbAll(sql, [`${prefix}%`]);
    debugger;
    console.log(`Found ${rows.length} games starting with '${prefix}'`);
    return rows;
  } catch (err) {
    console.error('DB search error:', err);
    throw err;
  }
}
app.whenReady().then(createWindow);

test("animal").then((games) => {
  console.log("Games found:", games);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
