import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import LoadingGif from "../components/LoadingGif";
import RowInfo from "../components/RowInfo";
import {
  tabType,
  tabState,
  tabUsage,
  tabSituation,
  formattedNumber,
  API_BACK
} from "../Global";
const axios = require("axios");

const API = API_BACK + "devis/";

const Estimate = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [devis, setDevis] = useState([]);
  const [token] = useState(props.token || "");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      });
      setDevis({ ...response.data });
      setIsLoading(false);
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  const formatNum = value => {
    return formattedNumber(value) + " € ";
  };

  return (
    <section className="wrapper content">
      {isLoading ? (
        <LoadingGif title="Chargement en cours" />
      ) : (
        <>
          <RowInfo grey={true} label="Numéro de Dossier " value={id} />
          <RowInfo label="Mail" value={devis.mail} />
          <RowInfo
            grey={true}
            label="Type de bien"
            value={tabType[devis.propertyType]}
          />
          <RowInfo label="Etat du bien" value={tabState[devis.propertyState]} />
          <RowInfo
            grey={true}
            label="Usage du bien "
            value={tabUsage[devis.propertyUse]}
          />
          <RowInfo
            label="Situation actuelle"
            value={tabSituation[devis.propertySituation]}
          />
          <RowInfo grey={true} label="Pays" value={devis.country} />
          <RowInfo label="Ville" value={devis.city} />

          <RowInfo
            grey={true}
            label="Montant estimé de votre acquisition"
            value={formatNum(devis.acquisitionAmount)}
          />
          <RowInfo
            label="Montant estimé des travaux"
            value={formatNum(devis.workingAmount)}
          />
          <RowInfo
            grey={true}
            label="Frais de notaire"
            value={formatNum(devis.notaryFees)}
          />
          <RowInfo
            label="Budget total estimé du projet"
            value={formatNum(devis.totalBudget)}
          />
        </>
      )}
    </section>
  );
};

export default Estimate;
