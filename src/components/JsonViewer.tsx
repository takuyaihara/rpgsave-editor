import React from 'react';
import ReactJson from 'react-json-view';

type Props = {
  data: any;
  onEdit?: (edit: any) => void;
};

const JsonViewer: React.FC<Props> = ({ data, onEdit }) => {
  return (
    <div style={{ backgroundColor: '#1e1e1e', padding: '20px', color: '#ccc' }}>
      <h2 style={{ color: '#fff' }}>JSON プレビュー・編集</h2>
      <ReactJson
        src={data}
        theme="monokai"
        collapsed={2}
        enableClipboard={true}
        displayDataTypes={false}
        onEdit={onEdit}
        onAdd={onEdit}
        onDelete={onEdit}
      />
    </div>
  );
};

export default JsonViewer;