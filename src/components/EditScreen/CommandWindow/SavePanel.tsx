import React from "react";
import "./save-panel.css";
import { compressToBase64 } from "lz-string";

interface SavePanelProps {
  saveData: object | null;
  fileName: string | null;
}

export const SavePanel: React.FC<SavePanelProps> = ({ saveData, fileName }) => {
  const handleClick = () => {
    if (!saveData || !fileName) return;

    const json = JSON.stringify(saveData);
    const compressed = compressToBase64(json);

    window.electron?.saveRpgsaveFile(compressed, fileName);
  };

  return (
    <div className="save-panel">
      <button className="save-button" onClick={handleClick}>
        ほぞん
      </button>
    </div>
  );
};
