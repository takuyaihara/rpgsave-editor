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
  _hp?: number;
  _mp?: number;
  _tp?: number;
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
  const basicParams: { key: keyof Pick<Actor, "_hp" | "_mp" | "_tp">; label: string }[] = [
    { key: "_hp", label: "Max HP" },
    { key: "_mp", label: "Max MP" },
    { key: "_tp", label: "TP" },
  ];

  const paramPlusLabels: { index: number; label: string }[] = [
    { index: 0, label: "ATK" },
    { index: 1, label: "DEF" },
    { index: 2, label: "MAT" },
    { index: 3, label: "MDF" },
    { index: 4, label: "AGI" },
    { index: 5, label: "LUK" },
  ];

  const raw = (saveData as SaveData)?.actors?._data;
  const actors: (Actor | null)[] = Array.isArray(raw?.["@a"]) ? raw["@a"] : [];

  const actorOptions = actors.flatMap((a, i) => {
    const name = a?._name || a?._nickname;
    return name ? [{ index: i, label: name }] : [];
  });

  const [actorIndex, setActorIndex] = useState(() =>
    actorOptions.length > 0 ? actorOptions[0].index : 0
  );

  const selectedActor: Actor | null = actors[actorIndex] ?? null;

  return (
    <div className="param-panel">
      <div className="actors-row">
        <label className="actors-label" htmlFor="actors-select">
          Actors
        </label>
        <select
          id="actors-select"
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

      {basicParams.map(({ key, label }) => (
        <div className="actors-row" key={key}>
          <label className="actors-label">{label}</label>
          <input
            type="text"
            className="actors-input"
            value={selectedActor?.[key] ?? 0}
            // onChange={handleChange}
          />
        </div>
      ))}

      {paramPlusLabels.map(({ index, label }) => (
        <div key={label} className="actors-row">
          <label className="actors-label">{label}</label>
          <input
            type="text"
            className="actors-input"
            value={selectedActor?._paramPlus?.["@a"]?.[index] ?? 0}
            // onChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
};
