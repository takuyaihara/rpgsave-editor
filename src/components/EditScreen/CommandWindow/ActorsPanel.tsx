import React, { useEffect, useMemo, useState } from "react";
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
    { index: 6, label: "HIT" },
    { index: 7, label: "EVA" },
  ];

  const actors = useMemo<(Actor | null)[]>(() => {
    const raw = (saveData as SaveData)?.actors?._data;
    return Array.isArray(raw?.["@a"]) ? raw["@a"] : [];
  }, [saveData]);

  const actorOptions = actors.reduce<{ index: number; label: string }[]>((acc, actor, i) => {
    const name = actor?._name || actor?._nickname;
    if (name) acc.push({ index: i, label: name });
    return acc;
  }, []);

  const [actorIndex, setActorIndex] = useState(-1);
  const selectedActor = actorIndex >= 0 ? actors[actorIndex] : null;

  useEffect(() => {
    const actor = actors[actorIndex];
    if (actor?._name) {
      setQuery(`"_name": "${actor._name}"`);
      setNextIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actorIndex]);

  const handleActorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setActorIndex(index);
  };

  const deepClone = function <T>(data: T): T {
    return structuredClone(data);
  };

  const changeParam = (key: keyof Pick<Actor, "_hp" | "_mp" | "_tp">, value: number) => {
    if (actorIndex < 0) return;
    setSaveData((prev: SaveData) => {
      const cloned = deepClone(prev);
      const actor = cloned.actors?._data?.["@a"]?.[actorIndex];
      if (actor) actor[key] = value;
      return cloned;
    });
  };

  const changeParamPlus = (index: number, value: number) => {
    if (actorIndex < 0) return;
    setSaveData((prev: SaveData) => {
      const cloned = deepClone(prev);
      const paramArray = cloned.actors?._data?.["@a"]?.[actorIndex]?._paramPlus?.["@a"];
      if (paramArray && paramArray.length > index) {
        paramArray[index] = value;
      }
      return cloned;
    });
  };

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
          onChange={handleActorChange}
        >
          <option value={-1} disabled>
            —
          </option>
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
            onChange={e => changeParam(key, Number(e.target.value))}
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
            onChange={e => changeParamPlus(index, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};
