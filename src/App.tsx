import React, { useState } from "react";
import { SaveDataEditor } from "./components/SaveDataEditor";
import { decompressFromBase64 } from "lz-string";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<object | null>(null);

  return (
    <div className="h-screen w-screen bg-[#000000] flex items-center justify-center ">
      {!decodedJson ? (
        <div className="start-screen-container">
          <img src="./assets/title.png" alt="タイトル画像" className="start-screen-title" />
          <img
            src="./assets/dropzone.png"
            alt="ドロップゾーン"
            draggable={false}
            className="start-screen-dropzone"
            onDrop={e => {
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
                  alert(
                    "データが　よみこめなかった！\nこわれている　か　まちがっている　かも　しれないぞ。"
                  );
                }
              };
              reader.readAsText(file);
            }}
            onDragOver={e => e.preventDefault()}
          />
        </div>
      ) : (
        <div className="flex min-h-screen w-full bg-[#000000] text-white font-famicomjp text-[10px] leading-none">
          {/* セーブデータ編集パネル（左側） */}
          <div className="relative w-3/4 p-2">
            {/* タイトルラベル（白枠に重ねる） */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center bg-black px-2 z-10">
              <div className="h-px w-4 bg-white mr-2"></div>
              <span className="text-white text-[12px] font-bold tracking-widest">セーブデータ</span>
              <div className="h-px w-4 bg-white ml-2"></div>
            </div>

            {/* 枠＋内容 */}
            <div className="border border-white rounded p-2 pt-5 bg-black">
              <div className="jsoneditor h-[500px] overflow-y-auto text-white font-famicomjp text-[10px] leading-tight">
                <SaveDataEditor initialData={decodedJson} />
              </div>
            </div>
          </div>

          {/* 右：コマンドパネル */}
          <div className="w-1/4 p-2 space-y-2">
            <h2 className="text-[12px] text-yellow-300">🔍 検索</h2>
            <input
              type="text"
              className="w-full bg-black border border-white p-1 text-white"
              placeholder="キー名を検索"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
