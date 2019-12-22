import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";
import Cookies from "js-cookie";
import ShowError from "./ShowError";
import RowInput from "../components/RowInput";
import { API_BACK } from "../Global";
const axios = require("axios");
const API = API_BACK + "devis/budget";

const ContentBudget = props => {
  const [acquisition, setAcquisition] = useState(""); // montant estimé acquisition
  const [works, setWorks] = useState(""); // montant estimé des travaux
  const [notaryFees, setNotaryFees] = useState(0); // frais de notaires
  const [totalBudget, setTotalBudget] = useState(0); // frais de notaires

  const propertyState = props.userData.radioState;
  console.log(props.userData);

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

  // const saveNotaryFee = value => {
  //   const newObj = { ...props.userData };
  //   newObj.notaryFees = value; // sauvegarde des frais de notaire
  //   props.saveUserData(newObj); // sauvegarde dans le state général
  // };
  // saveNotaryFee(notaryFees);

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui sont dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      const obj = JSON.parse(cookie);
      setAcquisition(castToNum(obj.acquisition));
      setWorks(castToNum(obj.works));
    }
  }, [notaryFees]);

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

  useEffect(() => {
    const fetchData = async (
      propertyState,
      acquisitionAmount,
      workingAmount
    ) => {
      try {
        const response = await axios.post(
          API,
          {
            propertyState: propertyState,
            acquisitionAmount: acquisitionAmount,
            workingAmount: workingAmount
          },
          { headers: { Accept: "application/json" } }
        );
        if (response.data) {
          setNotaryFees(response.data.notaryFees);
          setTotalBudget(response.data.totalBudget);
        }
      } catch (err) {
        console.log(err.message);
        alert("An error occured !!");
      }
    };

    const acquisitionAmount = castToNum(acquisition);
    const workingAmount = castToNum(works);
    if (propertyState === 0 || propertyState === 1) {
      fetchData(propertyState, acquisitionAmount, workingAmount);
    }
  }, [propertyState, acquisition, works]);

  return (
    <>
      <div className="df-col">
        <RowInput
          grey={true}
          name="acquisition"
          label="Montant estimé de votre acquisition *"
          value={acquisition}
          onChange={value => {
            const newObj = { ...props.userData };
            newObj.acquisition = Math.round(castToNum(value));
            //newObj.notaryFees = notaryFees(newObj.acquisition); // sauvegarde des frais de notaire
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
          //value={notaryFees(acquisition)}
          value={notaryFees}
        />
        <RowInput
          name="totalBudget"
          label="Budget total estimé du projet"
          value={totalBudget}
        />
      </div>
      <ShowError error={props.error} page={props.userData.currentPage} />
    </>
  );
};

export default ContentBudget;
