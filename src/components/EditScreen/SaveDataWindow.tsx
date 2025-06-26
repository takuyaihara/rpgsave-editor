import React, { useState, useEffect, useRef } from "react";

interface SaveDataWindowProps {
  saveData: object | null;
  query: string;
  nextIndex: number;
}

export const SaveDataWindow: React.FC<SaveDataWindowProps> = ({ saveData, query, nextIndex }) => {
  const [jsonText, setJsonText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setJsonText(JSON.stringify(saveData, null, 2));
  }, [saveData]);

  useEffect(() => {
    if (!query || !textareaRef.current) return;

    const lines = jsonText.split("\n");
    console.log("nextIndex: " + nextIndex);
    const index =
      nextIndex !== -1
        ? lines.findIndex((line, i) => i > nextIndex && line.includes(query))
        : lines.findIndex(line => line.includes(query));

    console.log("index: " + index);
    if (index !== -1) {
      const lineHeight = 18;
      textareaRef.current.scrollTop = index * lineHeight;
    }
  }, [query, jsonText, nextIndex]);

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
