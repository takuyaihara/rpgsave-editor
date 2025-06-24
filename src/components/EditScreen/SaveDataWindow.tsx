import React from "react";

interface SaveDataEditorProps {
  saveData: object;
}

export const SaveDataEditor: React.FC<SaveDataEditorProps> = ({ saveData }) => {
  return (
    <div className="save-data-window">
      <pre>{JSON.stringify(saveData, null, 2)}</pre>
    </div>
  );
};
