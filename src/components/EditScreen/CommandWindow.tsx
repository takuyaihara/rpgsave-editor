import React from "react";
import { SearchPanel } from "./CommandWindow/SearchPanel";

interface CommandWindowProps {
  onQueryChange: (value: string) => void;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({ onQueryChange }) => {
  return (
    <div className="command-window">
      <SearchPanel onQueryChange={onQueryChange} />
    </div>
  );
};
