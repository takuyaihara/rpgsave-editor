import React, { useState } from "react";
import "./search-panel.css";

interface SearchPanelProps {
  onQueryChange: (value: string) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onQueryChange }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onQueryChange(value);
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
        className="search-input"
      />
    </div>
  );
};
