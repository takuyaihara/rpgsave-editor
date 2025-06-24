import React from "react";

interface SaveDataEditorProps {
  saveData: object;
}

export const SaveDataEditor: React.FC<SaveDataEditorProps> = ({ saveData }) => {
  return (
    <div className="save-data-window">
      <div className="save-data-window__label">セーブデータ</div>
      <pre>{JSON.stringify(saveData, null, 2)}</pre>
    </div>
  );
};
