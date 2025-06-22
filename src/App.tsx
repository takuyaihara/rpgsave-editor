import React, { useState } from "react";
import FileDropZone from "./components/FileDropZone";
import { SaveDataEditor } from "./components/SaveDataEditor";
import { OptionPanel } from "./components/OptionPanel";
import { JsonEditorOptions } from "./types/jsonEditor";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<object | null>(null);

  const [options, setOptions] = useState<JsonEditorOptions>({
    allowEdit: true,
    allowAdd: true,
    allowDelete: true,
    showArrayIndices: true,
  });

  return (
    <div className="h-screen flex flex-col font-sans bg-white text-gray-800">
      <div className="bg-green-200 text-blue-800 font-bold p-4 rounded-lg">
        ✅ Tailwind CSS は有効です！
      </div>

      {/* Header */}
      <header className="text-xl font-bold px-4 py-2 border-b border-gray-300 shadow-sm">
        RPGセーブエディター
      </header>

      {/* Drop Zone */}
      <div className="p-4 border-b">
        <FileDropZone onJsonDecoded={setDecodedJson} />
      </div>

      {/* Main Editor + Options */}
      {decodedJson && (
        <div className="flex flex-1 overflow-hidden">
          {/* Editor Area */}
          <div className="w-2/3 p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">セーブデータ編集</h2>
            <SaveDataEditor initialData={decodedJson} options={options} />
          </div>

          {/* Option Panel */}
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
