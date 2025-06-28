import React from "react";

import { SearchPanel } from "./CommandWindow/SearchPanel";
import { MoneyEditPanel } from "./CommandWindow/MoneyEditPanel";
import { ActorsPanel } from "./CommandWindow/ActorsPanel";
import { SavePanel } from "./CommandWindow/SavePanel";

interface CommandWindowProps {
  saveData: object | null;
  setSaveData: (data: object) => void;
  query: string;
  setQuery: (value: string) => void;
  setNextIndex: (value: number) => void;
  fileName: string | null;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({
  saveData,
  setSaveData,
  query,
  setQuery,
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
      />
      <MoneyEditPanel
        saveData={saveData}
        setSaveData={setSaveData}
        setQuery={setQuery}
        setNextIndex={setNextIndex}
      />
      <ActorsPanel />
      <SavePanel saveData={saveData} fileName={fileName} />
    </div>
  );
};
