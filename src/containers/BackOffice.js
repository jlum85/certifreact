import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingGif from "../components/LoadingGif";
import "../App.css";
import "./BackOffice.css";
import { tabType, tabState, formattedNumber, API_BACK } from "../Global";
const axios = require("axios");

const API_GET = API_BACK + "devis";
const API_DEL = API_BACK + "devis/delete/";

const BackOffice = props => {
  const [devis, setDevis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token] = useState(props.token || "");

  // console.log("BackOffice");
  // console.log("token", props.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_GET, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token
          }
        });
        setDevis([...response.data]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        alert("An error occured !!");
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const removeItem = async dossier => {
    setIsLoading(true);
    try {
      await axios.post(
        API_DEL + dossier,
        {},
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      //nouveau tableau qui contient tout sauf le dossier supprimé
      const newDevis = devis.filter(item => item.dossierNumber !== dossier);
      setDevis(newDevis);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      alert("An error occured !!");
      setIsLoading(false);
    }
  };

  // liste des devis
  //  code postal, l'email, le type de bien (et son état) ainsi que le montant total de l'emprunt.
  const getItems = () => {
    return devis.map((item, index) => {
      const {
        mail,
        city,
        propertyType,
        propertyState,
        totalBudget,
        dossierNumber
      } = item;

      return (
        <div className="containerSynthese" key={index}>
          <svg
            className="removeButton"
            onClick={() => removeItem(dossierNumber)}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          <div className="bloclinkDevis">
            <Link className="linkDevis" to={"devis/" + dossierNumber}>
              <div
                className={
                  index % 2 === 0 ? "rowSynthese rowGrey" : "rowSynthese"
                }
              >
                <span className="size1">{dossierNumber}</span>
                <span className="size2">{mail}</span>
                <span className="size2">{city.toUpperCase()}</span>
                <span className="size1">{tabType[propertyType]}</span>
                <span className="size1">{tabState[propertyState]}</span>
                <span className="size1">{formattedNumber(totalBudget)}</span>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="wrapper content">
      {isLoading ? (
        <LoadingGif title="Chargement en cours" />
      ) : (
        <>
          <div className="headerSynthese">
            <span className="size1">Dossier</span>
            <span className="size2">Mail</span>
            <span className="size2">Ville</span>
            <span className="size1">Type de bien</span>
            <span className="size1"> Etat du bien</span>
            <span className="size1">Budget</span>
          </div>
          {getItems()}
        </>
      )}
    </section>
  );
};

export default BackOffice;
