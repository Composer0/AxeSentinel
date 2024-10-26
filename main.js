import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false, // Recommended for security
    },
  });

  // Load the Vite app (e.g., http://localhost:3000 if running the Vite dev server)
  win.loadURL('http://localhost:3000');
  win.loadFile('src/main.jsx');

  // Open the DevTools (optional)
  // win.webContents.openDevTools();
}

app.on('ready', createWindow);

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
