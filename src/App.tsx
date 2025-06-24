import React, { useState } from "react";
import { StartScreen } from "./components/StartScreen/StartScreen.tsx";
import { EditScreen } from "./components/EditScreen/EditScreen.tsx";

const App: React.FC = () => {
  const [saveData, setSaveData] = useState<object | null>(null);

  return !saveData ? <StartScreen onLoad={setSaveData} /> : <EditScreen saveData={saveData} />;
};

export default App;
