import React from "react";
import "./action-panel.css";
import { compressToBase64 } from "lz-string";

interface ActionPanelProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  fileName: string | null;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ saveData, setSaveData, fileName }) => {
  const handleClick = () => {
    if (!saveData || !fileName) return;

    const json = JSON.stringify(saveData);
    const compressed = compressToBase64(json);

    window.electron?.saveRpgsaveFile(compressed, fileName);
  };

  return (
    <div className="action-panel">
      <button className="action-button" onClick={handleClick}>
        Save
      </button>
      <button
        className="action-button"
        onClick={() => {
          setSaveData(null);
        }}
      >
        Reset
      </button>
    </div>
  );
};
