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
    const raw = e.target.value.replace(/[^\d]/g, "");
    const trimmed = raw.slice(0, 9);
    const value = Math.min(parseInt(trimmed, 10) || 0, 999999999);

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
    <div className="money-row">
      <label htmlFor="money-input" className="money-label">
        &emsp;おかね
      </label>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={9}
        value={gold.toString()}
        onChange={handleChange}
        className="money-input"
      />
    </div>
  );
};
