import { JsonEditorOptions } from "../types/jsonEditor";

type Props = {
  options: JsonEditorOptions;
  onChange: (opts: JsonEditorOptions) => void;
};

export const OptionPanel = ({ options, onChange }: Props) => {
  const handleToggle = (key: keyof JsonEditorOptions) => {
    onChange({ ...options, [key]: !options[key] });
  };

  return (
    <div className="space-y-2">
      <label>
        <input
          type="checkbox"
          checked={options.allowEdit}
          onChange={() => handleToggle("allowEdit")}
        />{" "}
        allowEdit
      </label>
      <label>
        <input
          type="checkbox"
          checked={options.allowAdd}
          onChange={() => handleToggle("allowAdd")}
        />{" "}
        allowAdd
      </label>
      <label>
        <input
          type="checkbox"
          checked={options.allowDelete}
          onChange={() => handleToggle("allowDelete")}
        />{" "}
        allowDelete
      </label>
      <label>
        <input
          type="checkbox"
          checked={options.showArrayIndices}
          onChange={() => handleToggle("showArrayIndices")}
        />{" "}
        showArrayIndices
      </label>
    </div>
  );
};
