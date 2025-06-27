import React from "react";
import "./money-edit-panel.css";

interface MoneyEditPanelProps {
  saveData: object | null;
  setSaveData: (data: object) => void;
  setQuery: (value: string) => void;
  setNextIndex: (value: number) => void;
}

type Gold = {
  party?: {
    _gold?: number;
  };
};

export const MoneyEditPanel: React.FC<MoneyEditPanelProps> = ({
  saveData,
  setSaveData,
  setQuery,
  setNextIndex,
}) => {
  const gold = (saveData as Gold)?.party?._gold ?? 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value, 10) || 0, 999999999);

    setSaveData((prev: object) => ({
      ...prev,
      party: {
        ...(prev as Gold).party,
        _gold: value,
      },
    }));

    setQuery("_gold");
    setNextIndex(-1);
  };

  return (
    <div className="search-row">
      <label htmlFor="money-input" className="search-label">
        おかね
      </label>
      <input
        id="money-input"
        type="number"
        min={0}
        max={999999999}
        value={gold}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};
