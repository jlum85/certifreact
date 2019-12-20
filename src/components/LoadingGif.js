import React from "react";
import "../App.css";
import "./Content.css";
import loadingRound from "../images/loading-round.gif";

const LoadingGif = props => {
  return (
    <div className="loadingBox">
      {props.title} <br></br>
      <img className="loadingRound" src={loadingRound} alt="Chargement"></img>
    </div>
  );
};

export default LoadingGif;
