import React from "react";
import "../App.css";
import "./Content.css";

const NumberInput = props => {
  // formatage des montants pour les rendre plus lisibles
  const formattedNumber = value => {
    if (value) {
      return props.value.toLocaleString();
    } else {
      return 0;
    }
  };

  return (
    <input
      className="inputNum"
      type="text"
      name={props.name}
      value={formattedNumber(props.value)}
      readOnly={props.onChange === undefined} // les champs calculés doivent être non saisissables
      onChange={event => {
        const value = event.target.value;
        props.onChange(value);
      }}
    />
  );
};

export default NumberInput;
