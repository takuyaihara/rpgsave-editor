import React from "react";
import "./gold-panel.css";

interface GoldPanelProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  setQuery: (value: string) => void;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
}

export const GoldPanel: React.FC<GoldPanelProps> = ({
  saveData,
  setSaveData,
  setQuery,
  setSilentQuery,
  setNextIndex,
}) => {
  const findGold = (data: object | null): number => {
    try {
      const match = JSON.stringify(data).match(/"_gold":\s*(\d+)/);
      return match ? Number(match[1]) : 0;
    } catch {
      return 0;
    }
  };

  const gold = findGold(saveData);
  const maxGold = 999_999_999;
  const minGold = 0;

  const updateGold = (amount: number) => {
    setSaveData((prev: object) => {
      const json = JSON.stringify(prev);
      const updated = json.replace(/("_gold":\s*)(\d+(\.\d+)?)/, `$1${amount}`);

      return JSON.parse(updated);
    });
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
