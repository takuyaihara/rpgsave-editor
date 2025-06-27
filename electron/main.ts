import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 640,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    title: "",
    icon: path.join(process.env.VITE_PUBLIC, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(RENDERER_DIST, "index.html"));
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

ipcMain.on("save-rpgsave-file", async (_, data: string) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  const result = await dialog.showSaveDialog(win, {
    title: "セーブ　しますか？",
    defaultPath: "file1.rpgsave",
    filters: [{ name: "RPGツクールMV セーブデータ", extensions: ["rpgsave"] }],
  });

  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, data, "utf-8");
  }
});
