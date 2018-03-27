import { app, BrowserWindow, autoUpdater,  dialog } from 'electron';
// import { autoUpdater } from "electron-updater"
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
var log = require('electron-log');

const sendStatusToWindow = (text) => {
  log.info('index sendStatusToWindow text', text);
  // log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
};

autoUpdater.logger = sendStatusToWindow;
// autoUpdater.logger.transports.file.level = "info";
log.transports.file.level = 'info';
log.transports.file.file = __dirname + '/mitapp.log';
// require('electron-squirrel-startup');

if (require('electron-squirrel-startup')) {
  app.quit();
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// const isDevMode = process.execPath.match(/[\\/]electron/);
const isDevMode = true;

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.loadURL(`file://${__dirname}/login.html`);

  // Open the DevTools.
  // if (isDevMode) {
  installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
    log.info('index name name', name);
    mainWindow.webContents.openDevTools();
  });
  // }

  mainWindow.version = app.getVersion();
  log.info('index createWindow app.getVersion() ', app.getVersion());


  mainWindow.webContents.once('did-frame-finish-load', () => {
    sendStatusToWindow('did-frame-finish-load');

    const server = 'http://localhost:3000';
    const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
    log.info('index feed feed', feed);

    autoUpdater.setFeedURL(feed);
    setInterval(() => {
      sendStatusToWindow('feedurl ' + autoUpdater.getFeedURL());
      autoUpdater.checkForUpdates();
    }, 30000)
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow().then(() => {
    sendStatusToWindow('ola ole');

  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------


autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available. ' + info);
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available. ' + info);
});
autoUpdater.on('error', err => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on('download-progress', progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded; will install now '+info);
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately

  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? 'DADA' : 'BABA',
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
  // autoUpdater.quitAndInstall();
});
