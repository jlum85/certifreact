import React from "react";
import "../App.css";
import "./Content.css";
import infos from "../images/infos.png";

const LabelForInput = props => {
  return (
    <label className="labelInput" htmlFor={props.htmlFor}>
      {props.label}
      <img className="info" src={infos} alt="infos"></img>
    </label>
  );
};

export default LabelForInput;
