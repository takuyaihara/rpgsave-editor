import React from "react";

import { SearchPanel } from "./CommandWindow/SearchPanel";
import { MoneyEditPanel } from "./CommandWindow/MoneyEditPanel";

interface CommandWindowProps {
  saveData: object | null;
  setSaveData: (data: object) => void;
  query: string;
  setQuery: (value: string) => void;
  setNextIndex: (value: number) => void;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({
  saveData,
  setSaveData,
  query,
  setQuery,
  setNextIndex,
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
    </div>
  );
};
