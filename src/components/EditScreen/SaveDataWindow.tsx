import React, { useState, useEffect } from "react";

interface SaveDataEditorProps {
  saveData: object;
}

export const SaveDataEditor: React.FC<SaveDataEditorProps> = ({ saveData }) => {
  const [jsonText, setJsonText] = useState<string>("");

  useEffect(() => {
    setJsonText(JSON.stringify(saveData, null, 2));
  }, [saveData]);

  return (
    <div className="save-data-window">
      <textarea
        value={jsonText}
        onChange={e => setJsonText(e.target.value)}
        className="json-editor"
        spellCheck={false}
      />
    </div>
  );
};
