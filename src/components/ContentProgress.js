import React from "react";
import "../App.css";
import "./ContentProgress.css";

const lastPage = 8;

const ContentProgress = props => {
  //   console.log("ContentProgress");
  //   console.log(props);

  // calcul du % de progression en fonction de la page courante
  const getProgress = currentPage => {
    // on a étapes dont la dernière est la confirmation
    // 1) Type de bien : 12,5 %
    // 2) Etat du bien : 25 %
    // ....
    // 7) Coordonnées :  87,5 % Valider
    // 8) Confirmation : 100%
    return Number(currentPage) * (100 / lastPage) + " % ";
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
      <div
        className="previous"
        onClick={() => {
          props.onPrev();
        }}
      >
        Précédent
      </div>
      <div className="rangeProgress"> {getProgress(props.currentPage)} </div>
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
