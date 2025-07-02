import React, { useState, useEffect, useRef, useMemo } from "react";

interface SaveDataWindowProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  query: string;
  nextIndex: number;
  jsonKey: React.RefObject<string>;
}

export const SaveDataWindow: React.FC<SaveDataWindowProps> = ({
  saveData,
  setSaveData,
  query,
  nextIndex,
  jsonKey,
}) => {
  const [jsonText, setJsonText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineHeight = 18;

  const baseJsonText = useMemo(() => {
    return saveData ? JSON.stringify(saveData, null, 2) : "";
  }, [saveData]);

  useEffect(() => {
    setJsonText(baseJsonText);
  }, [baseJsonText]);

  useEffect(() => {
    if (!query || !textareaRef.current) return;

    const lines = jsonText.split("\n");
    const targetIndex =
      nextIndex !== -1
        ? lines.findIndex((line, i) => i > nextIndex && line.includes(query))
        : lines.findIndex(line => line.includes(query));

    if (targetIndex === -1) return;

    const key = jsonKey.current;
    let index = targetIndex;

    if (query.startsWith(`"_name":`)) {
      if (key === "_hp") {
        const hpIndex = lines
          .slice(0, targetIndex)
          .reverse()
          .findIndex(line => line.includes(`"_hp"`));
        if (hpIndex !== -1) {
          index = targetIndex - 1 - hpIndex;
        }
      }
    }

    if (index !== -1) textareaRef.current.scrollTop = index * lineHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, jsonText, nextIndex]);

  const changeJsonText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setSaveData(parsed);
    } catch (_) {
      // ignore invalid JSON
    }
  };

  return (
    <div className="save-data-window">
      <textarea
        ref={textareaRef}
        value={jsonText}
        onChange={changeJsonText}
        className="json-editor"
        spellCheck={false}
      />
    </div>
  );
};
