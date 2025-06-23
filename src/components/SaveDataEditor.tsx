import React from "react";
import "../index.css";

interface SaveDataEditorProps {
  data: object;
}

export const SaveDataEditor: React.FC<SaveDataEditorProps> = ({ data }) => {
  return (
    <div className="save-data-editor-container">
      <div className="json-display-panel">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="command-panel"></div>
    </div>
  );
};
