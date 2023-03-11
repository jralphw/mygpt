// Importing required modules from electron, path and openai
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");

// Creating a new instance of OpenAI's configuration with the API key from environment variable
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API
});

// Creating a new instance of OpenAI API using the provided configuration 
const openai = new OpenAIApi(configuration);

// Declaring a variable for storing the answer string
let ans = '';

// Function to create and open a new browser window
const createWindow = () => {
    // Creating a new browser window with the specified properties
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 80,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile('qn.html');
}


// Event listener on main process to handle incoming messages from renderer process with a question
ipcMain.on('send-qn', async (event, qn) => {
    console.log(qn);
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.hide();

    // Run the question through OpenAI's GPT-3 AI model to generate an answer
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: qn }],
    });
    ans = completion.data.choices[0].message.content;
    console.log(ans);
    reply(ans);
    // mainWindow.close();
})

function reply(answer) {
    const resWindow = new BrowserWindow({
        width: 1000,
        height: 100,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload2.js'),
        }
    });
    resWindow.loadFile('ans.html');
    resWindow.webContents.send('ai-ans', answer);
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



/* app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  }) */