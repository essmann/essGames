const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openImageFile: () => ipcRenderer.invoke('open-image-file'),
  getGames: () => ipcRenderer.invoke('get-games')
})
