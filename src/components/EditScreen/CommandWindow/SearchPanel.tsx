import React, { useState } from "react";
import "./search-panel.css";

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-row">
      <label htmlFor="search-input" className="search-label">
        けんさく
      </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
