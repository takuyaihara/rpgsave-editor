import { useState } from "react";

type SaveDataEditorProps = {
  initialData: unknown;
};

export const SaveDataEditor = ({ initialData }: SaveDataEditorProps) => {
  const [json] = useState<object>(initialData as object);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-[#000000] text-white border border-white p-2 text-[10px] leading-tight font-famicomjp whitespace-pre overflow-auto h-[500px]">
        {JSON.stringify(json, null, 2)}
      </div>
    </div>
  );
};
