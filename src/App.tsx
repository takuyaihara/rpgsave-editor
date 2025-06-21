import React, { useState } from "react";
import FileDropZone from "./components/FileDropZone";
import { JsonEditorPoC } from "./components/JsonEditorPoC";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<any | null>(null);

  return (
    <div>
      <h1>RPGセーブエディター</h1>
      <FileDropZone onJsonDecoded={setDecodedJson} />

      <hr style={{ margin: "24px 0" }} />

      {decodedJson && (
        <>
          <h2>PoC: json-edit-react</h2>
          <JsonEditorPoC initialData={decodedJson} />
        </>
      )}
    </div>
  );
};

export default App;
