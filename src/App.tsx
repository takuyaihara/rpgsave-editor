import React, { useState } from "react";
import FileDropZone from "./components/FileDropZone";
import { SaveDataEditor } from "./components/SaveDataEditor";

const App: React.FC = () => {
  const [decodedJson, setDecodedJson] = useState<object | null>(null);

  return (
    <div>
      <h1>RPGセーブエディター</h1>
      <FileDropZone onJsonDecoded={setDecodedJson} />

      <hr style={{ margin: "24px 0" }} />

      {decodedJson && (
        <>
          <h2>PoC: json-edit-react</h2>
          <SaveDataEditor initialData={decodedJson} />
        </>
      )}
    </div>
  );
};

export default App;
