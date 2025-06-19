import './App.css'
import React from 'react';
import FileDropZone from './components/FileDropZone';

const App: React.FC = () => {
  return (
    <div>
      <h1>RPGセーブエディター</h1>
      <FileDropZone />
    </div>
  );
};

export default App;