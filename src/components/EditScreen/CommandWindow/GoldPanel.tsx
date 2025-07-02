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
  const gold = findGold(saveData);
  const maxGold = 999_999_999;

  const changeGold = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const clamped = Math.min(Number(raw || "0"), maxGold);

    updateGold(clamped);
    setSilentQuery(true);
    scroll();
  };

  const updateGold = (amount: number) => {
    setSaveData((prev: object) => {
      const json = JSON.stringify(prev);
      const updated = json.replace(/("_gold":\s*)(\d+(\.\d+)?)/, `$1${amount}`);

      return JSON.parse(updated);
    });
  };

  const scroll = () => {
    setQuery("_gold");
    setNextIndex(-1);
  };

  function findGold(data: object | null): number {
    try {
      const match = JSON.stringify(data).match(/"_gold":\s*(\d+)/);
      return match ? Number(match[1]) : 0;
    } catch {
      return 0;
    }
  }

  return (
    <div className="gold-row">
      <span
        className="gold-label clickable"
        onClick={() => {
          updateGold(maxGold);
          setSilentQuery(true);
          scroll();
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
