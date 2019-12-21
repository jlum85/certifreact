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

  const checkParam = userData => {
    const page = userData.currentPage;
    const result = { hasError: false, message: "error" };

    if (page === 1) {
      result.hasError = userData.radioType < 0;
      result.message = "Vous devez sélectionner un type de bien !";
    } else if (page === 2) {
      result.hasError = userData.radioState < 0;
      result.message = "Vous devez sélectionner l'état du bien !";
    } else if (page === 3) {
      result.hasError = userData.radioUse < 0;
      result.message = "Vous devez sélectionner l'usage du bien!";
    } else if (page === 4) {
      result.hasError = userData.radioSituation < 0;
      result.message = "Vous devez sélectionner votre situation !";
    } else if (page === 5) {
      // on doit choisir le pays et la ville
      result.hasError = !userData.country || !userData.city;
      if (!userData.country) {
        result.message = "Pays non renseigné !";
      } else if (!userData.city) {
        result.message = "Ville non renseignée !";
      }
    } else if (page === 6) {
      // on doit renseigner le montant estimé de l'acquisition ( montant travaux optionnel )
      result.hasError = userData.acquisition <= 0;
      result.message = "Montant acquisition non renseigné!";
    } else if (page === 7) {
      result.hasError = !userData.accept || !userData.mail;
      if (!userData.accept) {
        result.message = "Vous devez accepter les conditions générales !";
      } else if (!userData.mail) {
        result.message = "Mail non renseigné !";
      }
    }
    console.log(result);
    return result;
  };

  const saveData = async userData => {
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
  };

  const onNext = async currentPage => {
    const checkObj = checkParam(props.userData); // on vérifie si on peut passer à l'étape suivante
    props.setError({ ...checkObj });
    if (!checkObj.hasError) {
      if (currentPage === lastPage - 1) {
        await saveData(props.userData);
      } else {
        props.onNext();
      }
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
          <div className="orange-btn" onClick={() => onNext(props.currentPage)}>
            {getNextLabel(props.currentPage)}
          </div>
        </>
      )}
    </section>
  );
};

export default ContentProgress;
