import React, { useState } from "react";
import { SaveDataEditor } from "./components/SaveDataEditor";
import { decompressFromBase64 } from "lz-string";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<object | null>(null);

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
        setDecodedJson(json);
      } catch {
        alert("データが　よみこめなかった！\nこわれている　か　まちがっている　かも　しれないぞ。");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen w-screen bg-[#000000] flex items-center justify-center ">
      {!decodedJson ? (
        <div className="start-screen-container">
          <img src="./assets/title.png" className="start-screen-title" />
          <img
            src="./assets/dropzone.png"
            draggable={false}
            className="start-screen-dropzone"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          />
        </div>
      ) : (
        <div className="save-data-editor-container">
          {/* セーブデータ編集画面の内容 */}
          <SaveDataEditor data={decodedJson} />
        </div>
      )}
    </div>
  );
};

export default App;
