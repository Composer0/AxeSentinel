// preload.js
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  // Define your APIs here
});
