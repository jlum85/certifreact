import React from "react";
import "../App.css";

const RowInfo = props => {
  return (
    <div className={props.grey ? "rowInput rowGrey" : "rowInput"}>
      <div className="labelInput">{props.label}</div>
      <div className="labelInput">{props.value}</div>
    </div>
  );
};

export default RowInfo;
