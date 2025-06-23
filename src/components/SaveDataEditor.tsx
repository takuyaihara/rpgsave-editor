import { useState } from "react";
import { JsonEditor } from "json-edit-react";
import { JsonEditorOptions } from "../types/jsonEditor";

type SaveDataEditorProps = {
  initialData: unknown;
  options: JsonEditorOptions;
};

export const SaveDataEditor = ({ initialData, options }: SaveDataEditorProps) => {
  const [json, setJson] = useState<object>(initialData as object);

  return (
    <div className="p-4 space-y-4">
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
