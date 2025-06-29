import React, { useState } from "react";

import { StartScreen } from "./components/StartScreen/StartScreen";
import { EditScreen } from "./components/EditScreen/EditScreen";

const App: React.FC = () => {
  const [saveData, setSaveData] = useState<object | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return !saveData ? (
    <StartScreen onLoad={setSaveData} setFileName={setFileName} />
  ) : (
    <EditScreen saveData={saveData} setSaveData={setSaveData} fileName={fileName} />
  );
};

export default App;
