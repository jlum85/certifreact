import React from "react";
import "../App.css";

const Conforming = props => {
  // console.log("Conforming");
  // console.log(props);
  return (
    <div className="textConfirm">
      <span>Votre numéro de dossier est le </span>
      <span className="numDossier">123456 </span>
    </div>
  );
};

export default Conforming;
