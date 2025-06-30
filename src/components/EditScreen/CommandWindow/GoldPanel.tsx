import React from "react";
import "./gold-panel.css";

interface GoldPanelProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  setQuery: (value: string) => void;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
}

type Gold = {
  party?: {
    _gold?: number;
  };
};

export const GoldPanel: React.FC<GoldPanelProps> = ({
  saveData,
  setSaveData,
  setQuery,
  setSilentQuery,
  setNextIndex,
}) => {
  const gold = (saveData as Gold)?.party?._gold ?? 0;
  const maxGold = 999_999_999;
  const minGold = 0;

  const updateGold = (amount: number) => {
    setSaveData((prev: object) => ({
      ...prev,
      party: {
        ...(prev as Gold).party,
        _gold: amount,
      },
    }));
  };

  const scrollGold = () => {
    setQuery("_gold");
    setNextIndex(-1);
  };

  const changeGold = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.replace(/[^\d]/g, "").slice(0, 9);
    const value = Math.min(Number(trimmed) || minGold, maxGold);

    updateGold(value);
    setSilentQuery(true);
    scrollGold();
  };

  return (
    <div className="gold-row">
      <span
        className="gold-label clickable"
        onClick={() => {
          updateGold(maxGold);
          setSilentQuery(true);
          scrollGold();
        }}
      >
        Gold
      </span>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={9}
        value={gold.toString()}
        onChange={changeGold}
        className="gold-input"
      />
    </div>
  );
};
