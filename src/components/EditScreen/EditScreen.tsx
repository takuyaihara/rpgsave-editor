import React, { useState } from "react";

import { SaveDataWindow } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: object | null;
  setSaveData: (data: object) => void;
  fileName: string | null;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData, setSaveData, fileName }) => {
  const [query, setQuery] = useState("");
  const [silentQuery, setSilentQuery] = useState(false);
  const [nextIndex, setNextIndex] = useState<number>(-1);

  return (
    <div className="edit-screen">
      <SaveDataWindow
        saveData={saveData}
        setSaveData={setSaveData}
        query={query}
        nextIndex={nextIndex}
      />
      <CommandWindow
        saveData={saveData}
        setSaveData={setSaveData}
        query={query}
        setQuery={setQuery}
        silentQuery={silentQuery}
        setSilentQuery={setSilentQuery}
        setNextIndex={setNextIndex}
        fileName={fileName}
      />
    </div>
  );
};
