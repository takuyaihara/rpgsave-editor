import React from "react";
import { Logo } from "./Logo";
import { DropZone } from "./DropZone";
import "./start-screen.css";

type StartScreenProps = {
  onLoad: (json: object) => void;
};

export const StartScreen: React.FC<StartScreenProps> = ({ onLoad }) => {
  return (
    <div className="start-screen">
      <Logo />
      <DropZone onLoad={onLoad} />
    </div>
  );
};
