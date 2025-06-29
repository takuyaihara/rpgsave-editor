import React from "react";

import { SearchPanel } from "./CommandWindow/SearchPanel";
import { GoldPanel } from "./CommandWindow/GoldPanel";
import { ActorsPanel } from "./CommandWindow/ActorsPanel";
import { SavePanel } from "./CommandWindow/SavePanel";

interface CommandWindowProps {
  saveData: object | null;
  setSaveData: (data: object) => void;
  query: string;
  setQuery: (value: string) => void;
  silentQuery: boolean;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
  fileName: string | null;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({
  saveData,
  setSaveData,
  query,
  setQuery,
  silentQuery,
  setSilentQuery,
  setNextIndex,
  fileName,
}) => {
  return (
    <div className="command-window">
      <SearchPanel
        saveData={saveData}
        query={query}
        setQuery={setQuery}
        setNextIndex={setNextIndex}
        silentQuery={silentQuery}
        setSilentQuery={setSilentQuery}
      />
      <GoldPanel
        saveData={saveData}
        setSaveData={setSaveData}
        setQuery={setQuery}
        setSilentQuery={setSilentQuery}
        setNextIndex={setNextIndex}
      />
      <ActorsPanel
        saveData={saveData}
        setSaveData={setSaveData}
        setQuery={setQuery}
        setSilentQuery={setSilentQuery}
        setNextIndex={setNextIndex}
      />
      <SavePanel saveData={saveData} fileName={fileName} />
    </div>
  );
};
