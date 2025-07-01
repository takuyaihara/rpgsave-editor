# 🧾 Overview

**RPGSave Editor** is a desktop app that lets you edit save files (`.rpgsave`) from **RPG Maker MV** games.

This tool reads `.rpgsave` files and allows intuitive editing of gold and character parameters via a graphical user interface (GUI).

🎯 It is intended for **development support, debugging assistance, and adjustment tasks** — useful for testing and balance checking during game development.

---

# 🖼 Screenshots

### 🔸 Start Screen

The screen displayed right after launching the app.  
Drag and drop a `.rpgsave` file to begin loading.

![Start Screen](./screenshots/start.png)

---

### 🔸 Save Data Editor Screen

Once loaded, the save data is shown on the left.  
Gold and character parameters can be edited on the right.

![Edit Screen](./screenshots/edit.png)

---

# 💻 Supported Environment

- Supported OS:

  - ✅ Windows 10 / 11 (64bit)
  - ⚠️ macOS (planned for future support)
  - ❌ Linux (not supported)

- Supported save file formats:
  - ✅ `.rpgsave` (RPG Maker MV only)
  - ❌ `.save` (RPG Maker MZ is not supported)

---

# 📦 Download & How to Launch

1. Download `rpgsave-editor-v1.0.0-win32-x64.zip` from the  
   [Releases page](https://github.com/takuyaihara/rpgsave-editor/releases)

2. Right-click the downloaded zip file and select “Extract All”.

3. Open the extracted folder and double-click `rpgsave-editor.exe`.

4. Drag and drop a `.rpgsave` file into the window to start editing.

⚠️ On first launch, **Windows SmartScreen** may warn that the app is from an unknown publisher.  
To continue:

- Click “More info”
- Click the “Run anyway” button

---

# 🧩 Main Features

- Load and view `.rpgsave` files
- Display and edit JSON structure in real time (text editor format)
- Search and find (keyword navigation)
- Edit gold (`_gold`)
- Edit various character parameters (HP / MP / TP / buffs)
- Save changes (compressed back into `.rpgsave` using LZ-String)
- Reset to the start screen at any time

---

# ⚠️ Notes

- This tool edits `.rpgsave` files and saves them **with compression**.  
  You can overwrite or save under a new name when saving.  
  ⚠️ Please make a **backup** of the original file just in case.

- Depending on the changes made, the game may not behave correctly.  
  Use at your own risk.

- Editing character parameters allows **adjustments beyond the game's original design**.  
  This tool is intended primarily for development and testing purposes.

---

# 📜 License

MIT License © 2025 [takuyaihara](https://github.com/takuyaihara)

---

# 🌐 Language

This is the English version. For the original Japanese README, see [README.md](./README.md).
