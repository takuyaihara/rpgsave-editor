import React, { useMemo, useState } from "react";
import "./actors-panel.css";

interface ActorsPanelProps {
  saveData: object | null;
  setSaveData: (data: object | null) => void;
  setQuery: (value: string) => void;
  setSilentQuery: (value: boolean) => void;
  setNextIndex: (value: number) => void;
  setJsonKey: (key: string) => void;
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
  _level?: number;
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
  setSilentQuery,
  setNextIndex,
  setJsonKey,
}) => {
  const currentParamsLabels: { key: keyof Pick<Actor, "_hp" | "_mp" | "_tp">; label: string }[] = [
    { key: "_hp", label: "HP" },
    { key: "_mp", label: "MP" },
    { key: "_tp", label: "TP" },
  ];

  const paramPlusLabels: { index: number; label: string }[] = [
    { index: 0, label: "ATK+" },
    { index: 1, label: "DEF+" },
    { index: 2, label: "MAT+" },
    { index: 3, label: "MDF+" },
    { index: 4, label: "AGI+" },
    { index: 5, label: "LUK+" },
    { index: 6, label: "HIT+" },
    { index: 7, label: "EVA+" },
  ];

  const maxParams: Record<string, number> = {
    _level: 99,
    _hp: 999999,
    _mp: 9999,
    _tp: 100,
    paramPlus: 999,
  };

  const actors = useMemo<(Actor | null)[]>(() => {
    const rawData = (saveData as SaveData)?.actors?._data;

    if (!rawData) return [];
    if (Array.isArray(rawData["@a"])) return rawData["@a"];
    if (Array.isArray(rawData)) return rawData;
    return [];
  }, [saveData]);

  const actorOptions = actors.reduce<{ index: number; label: string }[]>((acc, actor, i) => {
    const name = actor?._name || actor?._nickname;
    if (name) acc.push({ index: i, label: name });
    return acc;
  }, []);

  const [actorIndex, setActorIndex] = useState(-1);
  const selectedActor = actorIndex >= 0 ? actors[actorIndex] : null;

  const changeActors = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    setActorIndex(index);

    const actor = actors[index];
    if (actor?._name) {
      setJsonKey("_name");
      setSilentQuery(true);
      setQuery(`"_name": "${actor._name}"`);
      setNextIndex(-1);
    }
  };

  const deepClone = <T,>(data: T): T => structuredClone(data);

  const updateActor = (updater: (actor: Actor) => void) => {
    if (actorIndex < 0) return;
    setSaveData((prev: SaveData) => {
      const cloned = deepClone(prev);
      const raw = cloned.actors?._data;
      const actor = Array.isArray(raw?.["@a"])
        ? (raw["@a"][actorIndex] ?? null)
        : Array.isArray(raw)
          ? (raw[actorIndex] ?? null)
          : null;

      if (actor) updater(actor);
      return cloned;
    });
  };

  const changeLevel = (value: number) => {
    updateActor(actor => {
      actor._level = value;
    });
  };

  const changeParam = (key: keyof Pick<Actor, "_hp" | "_mp" | "_tp">, value: number) => {
    updateActor(actor => {
      actor[key] = value;
    });
  };

  const changeParamPlus = (index: number, value: number) => {
    updateActor(actor => {
      const raw = actor._paramPlus;
      const paramArray = Array.isArray(raw) ? raw : Array.isArray(raw?.["@a"]) ? raw["@a"] : null;

      if (paramArray && index in paramArray) paramArray[index] = value;
    });
  };

  const safeInt = (value: string, max: number): number => {
    const trimmed = value.replace(/[^\d]/g, "").slice(0, 9);
    return Math.min(Number(trimmed) || 0, max);
  };

  const scroll = (key: string) => {
    setJsonKey(key);
    setQuery(`"_name": "${selectedActor?._name}"`);
    setNextIndex(-1);
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
          onChange={changeActors}
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

      <div className="actors-row">
        <span
          className="actors-label clickable"
          onClick={() => {
            changeLevel(maxParams._level);
            scroll("_name");
          }}
        >
          Level
        </span>
        <input
          type="text"
          className="actors-input"
          value={selectedActor?._level ?? 0}
          onChange={e => {
            changeLevel(safeInt(e.target.value, maxParams._level));
            scroll("_name");
          }}
        />
      </div>

      {currentParamsLabels.map(({ key, label }) => (
        <div className="actors-row" key={key}>
          <span
            className="actors-label clickable"
            onClick={() => {
              changeParam(key, maxParams[key]);
              scroll("_hp");
            }}
          >
            {label}
          </span>
          <input
            type="text"
            className="actors-input"
            value={selectedActor?.[key] ?? 0}
            onChange={e => {
              changeParam(key, safeInt(e.target.value, maxParams[key]));
              scroll("_hp");
            }}
          />
        </div>
      ))}

      {paramPlusLabels.map(({ index, label }) => (
        <div key={label} className="actors-row">
          <span
            className="actors-label clickable"
            onClick={() => {
              changeParamPlus(index, maxParams.paramPlus);
              scroll("_hp");
            }}
          >
            {label}
          </span>
          <input
            type="text"
            className="actors-input"
            value={(() => {
              const raw = selectedActor?._paramPlus;
              if (!raw) return 0;
              if (Array.isArray(raw)) return raw[index] ?? 0;
              if (Array.isArray(raw["@a"])) return raw["@a"][index] ?? 0;
              return 0;
            })()}
            onChange={e => {
              changeParamPlus(index, safeInt(e.target.value, maxParams.paramPlus));
              scroll("_hp");
            }}
          />
        </div>
      ))}
    </div>
  );
};
