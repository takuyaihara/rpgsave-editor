import React, { useState } from "react";
import "./search-panel.css";

interface SearchPanelProps {
  saveData: object | null;
  query: string;
  setQuery: (value: string) => void;
  silentQuery: boolean;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  saveData,
  query,
  setQuery,
  silentQuery,
  setSilentQuery,
  setNextIndex,
}) => {
  const [localNextIndex, setLocalNextIndex] = useState<number>(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSilentQuery(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const json = JSON.stringify(saveData, null, 2);
      const lines = json.split("\n");

      const index =
        localNextIndex !== -1
          ? lines.findIndex((line, i) => i > localNextIndex && line.includes(query))
          : lines.findIndex(line => line.includes(query));

      setLocalNextIndex(index);
      setNextIndex(index);
    }
  };

  return (
    <div className="search-row">
      <label htmlFor="search-input" className="search-label">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        value={silentQuery ? "" : query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
    </div>
  );
};
