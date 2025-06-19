import React, { useEffect, useState } from 'react';
import { decompressFromBase64 } from 'lz-string';
import JsonViewer from './JsonViewer';

const FileDropZone: React.FC = () => {
  const [jsonData, setJsonData] = useState<any | null>(null);

  const handleJsonEdit = (edit: any) => {
    console.log('編集内容:', edit);
    setJsonData(edit.updated_src); // 編集後のJSONをstateに反映
  };

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (!event.dataTransfer) return;

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];

        if (!file.name.endsWith('.rpgsave')) {
          alert('対応していないファイル形式です（.rpgsave のみ対応）');
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const decodedText = new TextDecoder('utf-8').decode(uint8Array);

          const jsonText = decompressFromBase64(decodedText);

          try {
            const json = JSON.parse(jsonText!);
            console.log('デコード成功:', json);
            setJsonData(json);
          } catch (e) {
            console.error('JSONパースに失敗しました:', e);
          }
        };

        reader.readAsArrayBuffer(file);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);
    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  return (
    <div
      style={{
        border: '2px dashed #aaa',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        color: '#555',
      }}
    >
      `.rpgsave` ファイルをここにドロップしてください

      {jsonData && <JsonViewer data={jsonData} onEdit={handleJsonEdit} />}
    </div>
  );
};

export default FileDropZone;