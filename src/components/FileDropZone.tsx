import React, { useEffect } from 'react';

const FileDropZone: React.FC = () => {
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (!event.dataTransfer) return;

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        // ✅ 拡張子チェック
        if (!file.name.endsWith('.rpgsave')) {
          alert('対応していないファイル形式です（.rpgsave のみ対応）');
          return;
        }

        reader.onload = () => {
          console.log('読み込み成功:', file.name);
          console.log(reader.result); // ArrayBuffer など
        };

        reader.readAsArrayBuffer(file);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    // イベント登録
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    // クリーンアップ（アンマウント時に解除）
    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []); // 初回のみ

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
    </div>
  );
};

export default FileDropZone;