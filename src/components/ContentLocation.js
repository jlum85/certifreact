import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";
import Cookies from "js-cookie";
import LabelForInput from "../components/LabelForInput";
import { api_Vipoco, tabCountry } from "../Global";
import loadingRound from "../images/loading-round.gif";
const axios = require("axios");

const ContentLocation = props => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableLoadSuggest, setDisableLoadSuggest] = useState(false);

  // construction du select pour la liste des pays
  const getCountries = () => {
    return tabCountry.map((item, index) => {
      return (
        <option key={index} value={item.toUpperCase()}>
          {item.toUpperCase()}
        </option>
      );
    });
  };

  // sauvegarde de la ville dans le state et dans userData
  const saveCity = (value, clicked) => {
    const city = value.toUpperCase();
    const newObj = { ...props.userData };
    newObj.city = city;
    // si on a sélectionné un choix dans la liste, pas besoin de retenter un chargement des suggestions quand on charge la page
    newObj.disableLoadSuggest = clicked;
    props.saveUserData(newObj); // sauvegarde dans le state général
    setDisableLoadSuggest(clicked);
    setCity(city);
    setShowSuggest(false);
  };

  // liste des villes pour l'auto-complete
  const getCities = () => {
    return suggestion.map((item, index) => {
      const { code, city } = item;
      return (
        <li
          key={index}
          className="autocomplete-item"
          onClick={() => saveCity(city + " (" + code + ")", true)}
        >
          {city.toUpperCase()} ({code})
        </li>
      );
    });
  };

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui sont dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      const obj = JSON.parse(cookie);
      setDisableLoadSuggest(obj.disableLoadSuggest); // pour éviter des appels Vipoco alors qu'on a déjà une ville valide
      setCountry(obj.country);
      setCity(obj.city);
    }
  }, [props.userData.currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_Vipoco + city);
        const cities = response.data.cities;
        setShowSuggest(cities.length > 1); // on affiche que si on a trouvé des suggestions
        setSuggestion([...cities]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        alert("An error occured !!");
        setIsLoading(false);
      }
    };

    // dès qu'on commence à saisir au moins 3 caractères, on fait appel à Vicopo sauf si on a déj une ville valide
    if (city.length > 2 && !disableLoadSuggest) {
      setIsLoading(true);
      fetchData();
    }
  }, [city, disableLoadSuggest]);

  return (
    <form autoComplete="off" className="content-input">
      <div className="rowInput rowGrey">
        <LabelForInput
          label="Dans quel pays se situe votre projet ? *"
          htmlFor={country}
        />
        <select
          name="country"
          className="inputCountry"
          value={country}
          onChange={event => {
            const value = event.target.value.toUpperCase();
            const newObj = { ...props.userData };
            newObj.country = value;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setCountry(value);
          }}
        >
          {getCountries()}
        </select>
      </div>
      <div className="rowInput">
        <LabelForInput label=" Ville ou code postal *" htmlFor={city} />
        <div className="autocomplete">
          <input
            className="inputCity"
            type="text"
            name="city"
            value={city}
            onChange={event => saveCity(event.target.value, false)}
          />

          {isLoading ? (
            <div className="autocomplete-list">
              Chargement <br></br>
              <img
                className="loadingRound"
                src={loadingRound}
                alt="Chargement"
              ></img>
            </div>
          ) : (
            <></>
          )}
          {showSuggest ? (
            <ul className="autocomplete-list">{getCities()}</ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="content-description df-col">
        <p>
          La connaisance du code postal du bien permettre de calculer les frais
          de notaire selonl es conditions en vigueur dans le département
          concerné.
        </p>
        <p>
          Si vous êtes en recherche de bien sur plusieurs communes, indiquez une
          commune ciblée.
        </p>
      </div>
    </form>
  );
};

export default ContentLocation;
