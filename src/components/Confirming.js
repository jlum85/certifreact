import React from "react";
import "../App.css";

const Conforming = props => {
  return (
    <div className="textConfirm">
      <span>Votre numéro de dossier est le </span>
      <span className="numDossier">{props.dossier}</span>
    </div>
  );
};

export default Conforming;
