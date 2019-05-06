// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const { fork } = require('child_process');
const ps = fork(`./server.js`);
var so = require('socket.io');


let mainWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            //nodeIntegration: true,
            webSecurity: false
        }
    });
    mainWindow.setContentSize(1320, 760);

    //mainWindow.loadFile('index.html');
    mainWindow.loadURL("http://localhost:8081");

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
