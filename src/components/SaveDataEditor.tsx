import { useState, useEffect } from "react";
import { JsonEditor } from "json-edit-react";
import { JsonEditorOptions } from "../types/jsonEditor";

type SaveDataEditorProps = {
  initialData: unknown;
  options: JsonEditorOptions;
};

export const SaveDataEditor = ({ initialData, options }: SaveDataEditorProps) => {
  const [json, setJson] = useState<object | null>(null);

  useEffect(() => {
    if (initialData) {
      setJson(initialData as object);
    }
  }, [initialData]);

  if (!json) return <div className="p-4">読み込み中...</div>;

  const handleMaxGold = () => {
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
    });
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={handleMaxGold}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
        {...options}
      />
    </div>
  );
};
