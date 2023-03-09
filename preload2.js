const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onAnswer: (callback) => ipcRenderer.on('ai-ans', callback)
})