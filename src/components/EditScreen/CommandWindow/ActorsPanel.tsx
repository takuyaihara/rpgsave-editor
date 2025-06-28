import React, { useState } from "react";
import "./actors-panel.css";

interface ActorsPanelProps {
  saveData: object | null;
  setSaveData: (data: object) => void;
  setQuery: (value: string) => void;
  setNextIndex: (value: number) => void;
}

type SaveData = {
  actors?: {
    _data?: {
      "@a"?: (Actor | null)[];
    };
  };
};

type Actor = {
  _name?: string;
  _nickname?: string;
  _paramPlus?: {
    "@a"?: number[];
  };
};

export const ActorsPanel: React.FC<ActorsPanelProps> = ({
  saveData,
  setSaveData,
  setQuery,
  setNextIndex,
}) => {
  const [actorIndex, setActorIndex] = useState(0);
  const raw = (saveData as SaveData)?.actors?._data;
  const actors: (Actor | null)[] = Array.isArray(raw?.["@a"]) ? raw["@a"] : [];

  const actorOptions = actors.flatMap((a, i) => {
    const name = a?._name || a?._nickname;
    return name ? [{ index: i, label: name }] : [];
  });

  return (
    <div className="param-panel">
      <div className="actors-row">
        <label className="actors-label">Actors</label>
        <select
          className="actors-select"
          value={actorIndex}
          onChange={e => setActorIndex(Number(e.target.value))}
        >
          {actorOptions.map(opt => (
            <option key={opt.index} value={opt.index}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="actors-row">
        <label className="actors-label">Max HP</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">Max MP</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">ATK</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">DEF</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">MAT</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">MDF</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">AGI</label>
        <input type="text" className="actors-input" />
      </div>
      <div className="actors-row">
        <label className="actors-label">LUK</label>
        <input type="text" className="actors-input" />
      </div>
    </div>
  );
};
