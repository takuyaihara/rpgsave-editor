import React, { useRef, useState } from "react";

import { SaveDataWindow } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  filePath: string | null;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData, setSaveData, filePath }) => {
  const [query, setQuery] = useState("");
  const [silentQuery, setSilentQuery] = useState(false);
  const [nextIndex, setNextIndex] = useState<number>(-1);
  const jsonKey = useRef<string>("");

  return (
    <div className="edit-screen">
      <SaveDataWindow
        saveData={saveData}
        setSaveData={setSaveData}
        query={query}
        nextIndex={nextIndex}
        jsonKey={jsonKey}
      />
      <CommandWindow
        saveData={saveData}
        setSaveData={setSaveData}
        query={query}
        setQuery={setQuery}
        silentQuery={silentQuery}
        setSilentQuery={setSilentQuery}
        setNextIndex={setNextIndex}
        setJsonKey={value => (jsonKey.current = value)}
        filePath={filePath}
      />
    </div>
  );
};
