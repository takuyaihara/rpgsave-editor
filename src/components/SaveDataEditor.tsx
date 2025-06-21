import { useState, useEffect } from "react";
import { JsonEditor } from "json-edit-react";

type SaveDataEditorProps = {
  initialData: unknown;
};

export const SaveDataEditor = ({ initialData }: SaveDataEditorProps) => {
  const [json, setJson] = useState<object | null>(null);

  useEffect(() => {
    if (initialData) {
      setJson(initialData);
    }
  }, [initialData]);

  if (!json) return <div>読み込み中...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>セーブデータ編集</h2>

      <button
        onClick={() =>
          setJson(prev => {
            if (
              !prev ||
              typeof prev !== "object" ||
              !("player" in prev) ||
              typeof (prev as { player?: unknown }).player !== "object"
            ) {
              return prev;
            }

            const prevObj = prev as {
              player?: { _gold?: number; [key: string]: unknown };
              [key: string]: unknown;
            };

            return {
              ...prevObj,
              player: { ...prevObj.player, _gold: 999999 },
            };
          })
        }
        style={{ marginBottom: 12 }}
      >
        所持金をMAXにする
      </button>

      <JsonEditor
        data={json}
        setData={data => setJson(data as object)}
        onUpdate={({ newData }) => {
          console.log("更新されたJSON:", newData);
        }}
        rootName="セーブデータ"
      />
    </div>
  );
};
