const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openImageFile: () => ipcRenderer.invoke('open-image-file')
})
