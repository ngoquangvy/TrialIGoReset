const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const regedit = require('regedit');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#312450',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'renderer', 'preload.js'),
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["self"],
                    scriptSrc: ["self"],
                    // Add more directives as needed
                }
            }
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    mainWindow.on('closed', () => {
        app.quit();
    });

    // Run the registry update every 5 seconds
    setInterval(() => {
        updateRegistry(mainWindow.webContents);
    }, 5000);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('updateRegistry', () => {
    if (mainWindow) {
        updateRegistry(mainWindow.webContents);
    } else {
        console.error('Main window is not defined.');
    }
});

function updateRegistry(webContents) {
    regedit.putValue({
        'HKCU\\Software\\Siacgltiyg\\SiaData\\MFTimes': {
            simplepoint: { value: 'Az+foJSad0P/kFw1nTAWPA==', type: 'REG_SZ' },
            position: { value: 'Az+foJSad0P/kFw1nTAWPA==', type: 'REG_SZ' },
            manypoint: { value: 'Az+foJSad0P/kFw1nTAWPA==', type: 'REG_SZ' },
            JoystickMovementTrialTime: { value: new Date().toLocaleTimeString(), type: 'REG_SZ' }
        }
    }, function (err) {
        if (err) {
            webContents.send('updateRegistrySuccess', { success: false, err, message: 'Failed to update registry.' });
            console.error(err);
        } else {
            webContents.send('updateRegistrySuccess', { success: true, message: 'Registry values updated successfully.' });
        }
    });
}
