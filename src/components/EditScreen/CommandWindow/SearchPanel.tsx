import React, { useState } from "react";
import "./search-panel.css";

interface SearchPanelProps {
  onQueryChange: (value: string) => void;
  index: number;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onQueryChange, index }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onQueryChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(index);
    }
  };

  return (
    <div className="search-row">
      <label htmlFor="search-input" className="search-label">
        けんさく
      </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
    </div>
  );
};
