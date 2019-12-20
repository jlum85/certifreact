import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";
import Cookies from "js-cookie";
import RowInput from "../components/RowInput";

const ContentBudget = props => {
  const [acquisition, setAcquisition] = useState(""); // montant estimé acquisition
  const [works, setWorks] = useState(""); // montant estimé des travaux
  // console.log("ContentBudget");
  // console.log(props);

  // conversion montant formaté en nombre
  const castToNum = value => {
    if (value && typeof value === "string") {
      return parseInt(value.replace(/\D/g, "")); // on enlève tous les caractères non numériques
    } else if (value && typeof value === "number") {
      return value;
    } else {
      return 0;
    }
  };

  // calcul des frais de notaire
  const notaryFees = acquisitionFee => {
    const value = castToNum(acquisitionFee);
    if (value > 0) {
      // un taux de 1,80% sur le prix de l'achat, pour un bien neuf : radioState = 1
      // un taux de 7,38% sur le prix de l'achat, pour un bien ancien :radioState= 0
      if (props.userData.radioState === 1) {
        return Math.round((value * 1.8) / 100);
      } else {
        return Math.round((value * 7.38) / 100);
      }
    }
    return 0;
  };

  // calcul du total budget
  const totalBudget = Math.round(
    castToNum(acquisition) + castToNum(works) + notaryFees(acquisition)
  );

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui sont dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      const obj = JSON.parse(cookie);
      setAcquisition(castToNum(obj.acquisition));
      setWorks(castToNum(obj.works));
    }
  }, [props.userData.currentPage]);

  return (
    <div className="df-col">
      <RowInput
        grey={true}
        name="acquisition"
        label="Montant estimé de votre acquisition *"
        value={acquisition}
        onChange={value => {
          const newObj = { ...props.userData };
          newObj.acquisition = Math.round(castToNum(value));
          newObj.notaryFees = notaryFees(newObj.acquisition); // sauvegarde des frais de naotaire
          props.saveUserData(newObj); // sauvegarde dans le state général
          setAcquisition(castToNum(value));
        }}
      />

      <RowInput
        name="works"
        label="Montant estimé des travaux"
        value={works}
        onChange={value => {
          const newObj = { ...props.userData };
          newObj.works = Math.round(castToNum(value));
          props.saveUserData(newObj); // sauvegarde dans le state général
          setWorks(castToNum(value));
        }}
      />

      <RowInput
        grey={true}
        name="notaryFees"
        label="Frais de notaire"
        value={notaryFees(acquisition)}
      />
      <RowInput
        name="totalBudget"
        label="Budget total estimé du projet"
        value={totalBudget}
      />
    </div>
  );
};

export default ContentBudget;
