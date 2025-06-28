import React from "react";
import "./actors-panel.css";

export const ActorsPanel: React.FC = () => {
  return (
    <div className="param-panel">
      <div className="actors-row">
        <label className="actors-label">Actors</label>
        <select className="actors-select">
          <option value="0">アクター1</option>
          <option value="1">アクター2</option>
          <option value="1">アクター3</option>
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
