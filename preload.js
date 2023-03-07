//@ts-check
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendQn: (qn) => ipcRenderer.send('send-qn', qn)
})