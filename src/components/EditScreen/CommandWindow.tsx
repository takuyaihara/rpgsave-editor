import React from "react";

import { SearchPanel } from "./CommandWindow/SearchPanel";
import { GoldPanel } from "./CommandWindow/GoldPanel";
import { ActorsPanel } from "./CommandWindow/ActorsPanel";
import { ActionPanel } from "./CommandWindow/ActionPanel";

interface CommandWindowProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  query: string;
  setQuery: (value: string) => void;
  silentQuery: boolean;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
  setJsonKey: (key: string) => void;
  filePath: string | null;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({
  saveData,
  setSaveData,
  query,
  setQuery,
  silentQuery,
  setSilentQuery,
  setNextIndex,
  setJsonKey,
  filePath,
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
        setJsonKey={setJsonKey}
      />
      <ActionPanel saveData={saveData} setSaveData={setSaveData} filePath={filePath} />
    </div>
  );
};
