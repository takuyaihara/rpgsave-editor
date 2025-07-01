import React from "react";

import { Logo } from "./Logo";
import { DropZone } from "./DropZone";
import "./start-screen.css";

type StartScreenProps = {
  onLoad: (json: object) => void;
  setFilePath: (path: string) => void;
};

export const StartScreen: React.FC<StartScreenProps> = ({ onLoad, setFilePath }) => {
  return (
    <div className="start-screen">
      <Logo />
      <DropZone onLoad={onLoad} setFilePath={setFilePath} />
    </div>
  );
};
