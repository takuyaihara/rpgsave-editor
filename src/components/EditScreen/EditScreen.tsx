import React from "react";
import { SaveDataEditor } from "./SaveDataWindow";
import { CommandWindow } from "./CommandWindow";
import "./edit-screen.css";

type EditScreenProps = {
  saveData: object;
};

export const EditScreen: React.FC<EditScreenProps> = ({ saveData }) => {
  return (
    <div className="edit-screen">
      <SaveDataEditor saveData={saveData} />
      <CommandWindow />
    </div>
  );
};
