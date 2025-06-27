import React from "react";
import "./money-edit-panel.css";

export const MoneyEditPanel: React.FC = () => {
  return (
    <div className="search-row">
      <label htmlFor="money-input" className="search-label">
        &emsp;おかね
      </label>
      <input id="money-input" type="number" className="search-input" />
    </div>
  );
};
