import React, { useState } from "react";
import { StartScreen } from "./components/StartScreen/StartScreen.tsx";
import { SaveDataEditor } from "./components/SaveDataWindow";

const App: React.FC = () => {
  const [saveData, setSaveData] = useState<object | null>(null);

  return !saveData ? (
    <StartScreen onLoad={setSaveData} />
  ) : (
    <div className="save-data-editor-container">
      <SaveDataEditor data={saveData} />
    </div>
  );
};

export default App;
