import React, { useState } from "react";
import { SaveDataEditor } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: object;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="edit-screen">
      <SaveDataEditor saveData={saveData} query={query} />
      <CommandWindow onQueryChange={setQuery} />
    </div>
  );
};
