import React, { useState, useEffect, useRef } from "react";

interface SaveDataEditorProps {
  saveData: object;
  query: string;
}

export const SaveDataEditor: React.FC<SaveDataEditorProps> = ({ saveData, query }) => {
  const [jsonText, setJsonText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setJsonText(JSON.stringify(saveData, null, 2));
  }, [saveData]);

  useEffect(() => {
    if (!query || !textareaRef.current) return;

    const lines = jsonText.split("\n");
    const index = lines.findIndex(line => line.includes(query));

    if (index !== -1) {
      const lineHeight = 18;
      textareaRef.current.scrollTop = index * lineHeight;
    }
  }, [query, jsonText]);

  return (
    <div className="save-data-window">
      <textarea
        ref={textareaRef}
        value={jsonText}
        onChange={e => setJsonText(e.target.value)}
        className="json-editor"
        spellCheck={false}
      />
    </div>
  );
};
