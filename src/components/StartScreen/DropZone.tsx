import React from "react";
import { decompressFromBase64 } from "lz-string";

type DropZoneProps = {
  onLoad: (json: object) => void;
};

export const DropZone: React.FC<DropZoneProps> = ({ onLoad }) => {
  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".rpgsave")) {
      alert("それは　セーブデータ（.rpgsave）では　ないようだね。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const compressed = reader.result as string;
        const jsonStr = decompressFromBase64(compressed);
        if (!jsonStr) throw new Error("Failed to decompress");

        const json = JSON.parse(jsonStr);
        onLoad(json);
      } catch {
        alert("データが　よみこめなかった！\nこわれている　か　まちがっている　かも　しれないぞ。");
      }
    };
    reader.readAsText(file);
  };

  return (
    <img
      src="./assets/dropzone.png"
      className="dropzone"
      draggable={false}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    />
  );
};
