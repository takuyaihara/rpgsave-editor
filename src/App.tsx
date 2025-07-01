import React, { useState } from "react";

import { StartScreen } from "./components/StartScreen/StartScreen";
import { EditScreen } from "./components/EditScreen/EditScreen";

const App: React.FC = () => {
  const [saveData, setSaveData] = useState<object | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  return !saveData ? (
    <StartScreen onLoad={setSaveData} setFilePath={setFilePath} />
  ) : (
    <EditScreen saveData={saveData} setSaveData={setSaveData} filePath={filePath} />
  );
};

export default App;
