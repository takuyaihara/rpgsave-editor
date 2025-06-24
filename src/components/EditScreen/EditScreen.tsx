import React from "react";
import { SaveDataEditor } from "./SaveDataWindow";
import type { SaveData } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: SaveData;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData }) => {
  return (
    <div className="edit-screen">
      <SaveDataEditor saveData={saveData} />
      <CommandWindow />
    </div>
  );
};
