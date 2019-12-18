import React from "react";
import "../App.css";
import "./ContentProgress.css";
import RangeSlider from "./RangeSlider";
import { lastPage } from "../Global";

const ContentProgress = props => {
  // console.log("ContentProgress");
  // console.log(props);

  // calcul du % de progression en fonction de la page courante
  const getProgress = currentPage => {
    // on a 8 étapes dont la dernière est la confirmation
    // 1) Type de bien : 0
    // 2) Etat du bien : 14 %
    // ....
    // 7) Coordonnées :  86 %   Valider
    // 8) Confirmation : 100%
    return Math.round(Number(currentPage - 1) * (100 / (lastPage - 1)));
  };

  const getNextLabel = currentPage => {
    if (currentPage === lastPage - 1) {
      return "Valider";
    } else {
      return "Suivant";
    }
  };

  return (
    <section className="pad2070 progress">
      {/* on masque le bouton précédent sur la 1ère page */}
      <div
        className={props.currentPage > 1 ? "previous" : "white"}
        onClick={() => {
          props.onPrev();
        }}
      >
        Précédent
      </div>

      {/* composant qui gère la barre de progression */}
      <RangeSlider value={getProgress(props.currentPage)} />

      <div
        className="next"
        onClick={() => {
          props.onNext();
        }}
      >
        {getNextLabel(props.currentPage)}
      </div>
    </section>
  );
};

export default ContentProgress;
