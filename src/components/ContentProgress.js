import React, { useState } from "react";
import "../App.css";
import "./ContentProgress.css";
import RangeSlider from "./RangeSlider";
import { lastPage } from "../Global";
import loadingRound from "../images/loading-round.gif";
const axios = require("axios");

const API_BACK = "http://localhost:3000/devis/create";

const ContentProgress = props => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("ContentProgress");
  console.log(props);

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

  const checkParam = userData => {
    // on doit accepter les conditions et avoir un mail
    return userData.accept && userData.mail;
  };

  const onNext = async currentPage => {
    console.log("onNext");
    if (currentPage === lastPage - 1) {
      // vérif des paramètres
      const userData = props.userData;
      if (checkParam(userData)) {
        setIsLoading(true);
        try {
          const response = await axios.post(
            API_BACK,
            {
              mail: userData.mail,
              propertyType: userData.radioType,
              propertyState: userData.radioState,
              propertyUse: userData.radioUse,
              propertySituation: userData.radioSituation,
              country: userData.country,
              city: userData.city,
              acquisitionAmount: userData.acquisition,
              workingAmount: userData.works,
              notaryFees: userData.notaryFees
            },
            {
              headers: { Accept: "application/json" }
            }
          );
          setIsLoading(false);
          const dossier = response.data.dossierNumber;
          if (dossier) {
            const newObj = { ...props.userData };
            newObj.currentPage = 8; // pour passer à la page de confirmation
            newObj.dossier = dossier;
            props.saveUserData(newObj); // sauvegarde dans le state général
          } else {
            alert("An error occured !!");
          }
        } catch (err) {
          console.log(err);
          alert("An error occured !!", err);
          setIsLoading(false);
        }
      }
    } else {
      props.onNext();
    }
  };

  return (
    <section className="pad2070 progress">
      {isLoading ? (
        <div className="inProgress">
          <img
            className="loadingProgress"
            src={loadingRound}
            alt="Chargement"
          ></img>
          <p> Validation en cours</p>
        </div>
      ) : (
        <>
          {/* on masque le bouton précédent sur la 1ère page */}
          <div
            className={props.currentPage > 1 ? "previous" : "white"}
            onClick={() => {
              props.onPrev();
            }}
          >
            Précédent
          </div>

          <RangeSlider value={getProgress(props.currentPage)} />
          <div className="next" onClick={() => onNext(props.currentPage)}>
            {getNextLabel(props.currentPage)}
          </div>
        </>
      )}
    </section>
  );
};

export default ContentProgress;
