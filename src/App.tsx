import React, { useState } from "react";
import { SaveDataEditor } from "./components/SaveDataEditor";
import { OptionPanel } from "./components/OptionPanel";
import { JsonEditorOptions } from "./types/jsonEditor";
import { decompressFromBase64 } from "lz-string";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<object | null>(null);

  const [options, setOptions] = useState<JsonEditorOptions>({
    allowEdit: true,
    allowAdd: true,
    allowDelete: true,
    showArrayIndices: true,
  });

  return (
    <div className="h-screen w-screen bg-[#000000] flex items-center justify-center">
      {!decodedJson ? (
        <div className="flex flex-col items-center">
          {/* タイトル画像 */}
          <img
            src="./assets/title.png"
            alt="タイトルロゴ"
            className="w-[80%] max-w-[360px] h-auto"
          />

          {/* ドロップエリア画像 + 判定ゾーン */}
          <div className="relative w-[90%] max-w-[360px]">
            <img
              src="./assets/dropzone.png"
              alt="ファイルドロップエリア"
              className="w-[90%] max-w-[360px]"
              draggable={false}
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const compressed = reader.result as string;
                      const jsonStr = decompressFromBase64(compressed);
                      const json = JSON.parse(jsonStr);
                      setDecodedJson(json);
                    } catch (err) {
                      alert("JSONの読み込みに失敗しました（圧縮データか形式不正の可能性）。");
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              onDragOver={e => e.preventDefault()}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-1 w-full overflow-hidden bg-white text-gray-800">
          {/* Editor */}
          <div className="w-2/3 p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">セーブデータ編集</h2>
            <SaveDataEditor initialData={decodedJson} options={options} />
          </div>

          {/* Options */}
          <div className="w-1/3 p-4 bg-gray-50 border-l border-gray-300 overflow-auto">
            <h3 className="text-md font-semibold mb-2">オプション</h3>
            <OptionPanel options={options} onChange={setOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
