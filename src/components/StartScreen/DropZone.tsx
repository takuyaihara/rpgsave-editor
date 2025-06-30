import React from "react";
import { decompressFromBase64 } from "lz-string";

type DropZoneProps = {
  onLoad: (json: object) => void;
  setFileName: (name: string) => void;
};

export const DropZone: React.FC<DropZoneProps> = ({ onLoad, setFileName }) => {
  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length !== 1) {
      alert("Drop only one file.");
      return;
    }

    const file = files[0];
    if (!file.name.endsWith(".rpgsave")) {
      alert("Not a .rpgsave file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const compressed = reader.result as string;
        const jsonStr = decompressFromBase64(compressed);
        const json = JSON.parse(jsonStr);

        onLoad(json);
        setFileName(file.name);
      } catch {
        alert("Cannot load. Maybe broken.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="dropzone-container">
      <img
        src="./assets/dropzone.png"
        className="dropzone"
        draggable={false}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      />
      <div className="dropzone-label">Drop .rpgsave here.</div>
    </div>
  );
};
