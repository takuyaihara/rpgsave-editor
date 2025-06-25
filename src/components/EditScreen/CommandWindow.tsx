import React from "react";
import { SearchPanel } from "./CommandWindow/SearchPanel";

interface CommandWindowProps {
  onQueryChange: (value: string) => void;
  index: number;
}

export const CommandWindow: React.FC<CommandWindowProps> = ({ onQueryChange, index }) => {
  return (
    <div className="command-window">
      <SearchPanel onQueryChange={onQueryChange} index={index} />
    </div>
  );
};
