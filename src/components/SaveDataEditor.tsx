import { useState, useEffect } from "react";
import { JsonEditor } from "json-edit-react";

type SaveDataEditorProps = {
  initialData: unknown;
};

export const SaveDataEditor = ({ initialData }: SaveDataEditorProps) => {
  const [json, setJson] = useState<any>(null);

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
          setJson((prev: any) => {
            if (!prev.player) return prev;
            return {
              ...prev,
              player: { ...prev.player, _gold: 999999 },
            };
          })
        }
        style={{ marginBottom: 12 }}
      >
        所持金をMAXにする
      </button>

      <JsonEditor
        data={json}
        setData={data => setJson(data as typeof json)}
        onUpdate={({ newData }) => {
          console.log("更新されたJSON:", newData);
        }}
        rootName="セーブデータ"
      />
    </div>
  );
};
