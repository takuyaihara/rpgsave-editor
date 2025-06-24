import React, { useState } from "react";

export const CommandWindow: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="command-window">
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
    </div>
  );
};
