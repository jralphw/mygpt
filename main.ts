const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: 'the previous API key has been deactivated'
});
const openai = new OpenAIApi(configuration);

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 80,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    ipcMain.on('send-qn', (event, qn) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents);
        console.log(qn);
        mainWindow.hide()
        askAI(qn, mainWindow);
    })

    mainWindow.loadFile('index.html')
}
app.whenReady().then(() => {
    console.log("Press Command/Ctrl + Alt + C to open");
    globalShortcut.register('CommandOrControl+Alt+C', () => {
        createWindow();
    });
    /* globalShortcut.register('Enter', () => {
        createWindow();
    }) */
})

async function askAI(question, window) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: question}],
    });
    console.log(completion.data.choices[0].message.content);
    window.close();
}
/* app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  }) */