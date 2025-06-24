import React from "react";
import { SearchPanel } from "./CommandWindow/SearchPanel";

export const CommandWindow: React.FC = () => {
  return (
    <div className="command-window">
      <SearchPanel />
    </div>
  );
};
