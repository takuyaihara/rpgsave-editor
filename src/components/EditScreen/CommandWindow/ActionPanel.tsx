import React from "react";
import "./action-panel.css";
import { compressToBase64 } from "lz-string";

interface ActionPanelProps {
  saveData: object | null;
  fileName: string | null;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ saveData, fileName }) => {
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
      <button className="action-button">Reset</button>
    </div>
  );
};
