const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
let win;


const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadURL('http://localhost:5173/')
}

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

const db = new sqlite3.Database('./sqlite/games.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

const util = require('util');
const dbAll = util.promisify(db.all.bind(db));
// IPC handler to expose openFile to renderer
ipcMain.handle('open-image-file', async () => {
  return await openFile()
})

ipcMain.handle('get-games', async () => {
  try {
    const rows = await dbAll('SELECT * FROM games');
    console.log('DB rows:', rows);  // <--- Add this
    return rows;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
