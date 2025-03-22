import React from "react";
import { VARIABLES } from "./variables";
import "../styles/editor.css";

const VariablePopover = ({ onSelect }) => {
  return (
    <div className="popover">
      {VARIABLES.map((variable) => (
        <div key={variable.id} className="popover-item" onClick={() => onSelect(variable)}>
          {variable.label}
        </div>
      ))}
    </div>
  );
};

export default VariablePopover;
