import React from "react";
import "./money-edit-panel.css";

interface MoneyEditPanelProps {
  saveData: object | null;
}

type Gold = {
  party?: {
    _gold?: number;
  };
};

export const MoneyEditPanel: React.FC<MoneyEditPanelProps> = ({ saveData }) => {
  const gold = (saveData as Gold)?.party?._gold ?? 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="search-row">
      <label htmlFor="money-input" className="search-label">
        おかね
      </label>
      <input
        id="money-input"
        type="number"
        value={gold}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};
