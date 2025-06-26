import React from "react";

import { SearchPanel } from "./CommandWindow/SearchPanel";

interface CommandWindowProps {
  saveData: object | null;
  query: string;
  setQuery: (value: string) => void;
  setNextIndex: (value: number) => void;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({
  saveData,
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
    </div>
  );
};
