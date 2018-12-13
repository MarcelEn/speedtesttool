const { app, BrowserWindow, ipcMain } = require('electron')
const speedTest = require('speedtest-net');

const TEST_TIME = 5000;

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 600, height: 650 })

  mainWindow.loadFile('ui/dist/index.html')

  mainWindow.setResizable(false);
  mainWindow.setMenu(null)


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

let running = false
ipcMain.on('start', (event, arg) => {
  running = true;
  runTest(event)
})

ipcMain.on('stop', (event, arg) => {
  running = false;
})


const runTest = (event) => {
  var test = speedTest({ maxTime: TEST_TIME });

  test.on('data', data => {
    if (running){
      event.sender.send('data', [data])
      runTest(event)
    }
  });

  test.on('error', err => {
    event.sender.send('error', err)
  });
}
