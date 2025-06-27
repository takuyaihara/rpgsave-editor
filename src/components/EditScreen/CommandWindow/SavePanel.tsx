import React from "react";
import "./save-panel.css";
import { compressToBase64 } from "lz-string";

interface SavePanelProps {
  saveData: object | null;
}

export const SavePanel: React.FC<SavePanelProps> = ({ saveData }) => {
  const handleClick = () => {
    if (!saveData) return;

    const json = JSON.stringify(saveData);
    const compressed = compressToBase64(json);

    window.electron?.saveRpgsaveFile(compressed);
  };

  return (
    <div className="save-panel">
      <button className="save-button" onClick={handleClick}>
        ほぞん
      </button>
    </div>
  );
};
