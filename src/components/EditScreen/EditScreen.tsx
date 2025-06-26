import React, { useState } from "react";

import { SaveDataWindow } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: object | null;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData }) => {
  const [query, setQuery] = useState("");
  const [nextIndex, setNextIndex] = useState<number>(-1);

  return (
    <div className="edit-screen">
      <SaveDataWindow saveData={saveData} query={query} nextIndex={nextIndex} />
      <CommandWindow
        saveData={saveData}
        query={query}
        setQuery={setQuery}
        setNextIndex={setNextIndex}
      />
    </div>
  );
};
