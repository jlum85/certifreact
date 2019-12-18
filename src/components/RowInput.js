import React from "react";
import "../App.css";
import "./Content.css";
import LabelForInput from "../components/LabelForInput";
import NumberInput from "../components/NumberInput";

const RowInput = props => {
  return (
    <div className={props.grey ? "rowInput rowGrey" : "rowInput"}>
      <LabelForInput label={props.label} htmlFor={props.name} />

      {/* certains inputs sont calclulés donc ils n'ont pas de onChange */}
      {props.onChange ? (
        <NumberInput
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
        <NumberInput name={props.name} value={props.value} />
      )}

      <div className="euro"> € </div>
    </div>
  );
};

export default RowInput;
