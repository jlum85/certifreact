import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";
import Cookies from "js-cookie";
import LabelForInput from "../components/LabelForInput";
const axios = require("axios");

const ContentLocation = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  //console.log("ContentLocation");
  // console.log(props);
  // console.log(suggestion);

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui sont dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      const obj = JSON.parse(cookie);
      setCountry(obj.country);
      setCity(obj.city);
    }
  }, [props.userData.currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vicopo.selfbuild.fr/cherche/" + city
        );
        const cities = response.data.cities;
        setSuggestion([...cities]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        alert("An error occured !!");
        setIsLoading(false);
      }
    };

    // dès qu'on commence à saisir au moins 3 caractères, on fait appel à Vicopo pour proposer des suggestions
    if (city.length > 2) {
      setIsLoading(true);
      fetchData();
    }
  }, [city]);

  return (
    <div className="content-input">
      <div className="rowInput rowGrey">
        <LabelForInput
          label="Dans quel pays se situe votre projet ? *"
          htmlFor={country}
        />
        <input
          className="inputCountry"
          type="text"
          name="country"
          value={country}
          onChange={event => {
            const value = event.target.value;
            const newObj = { ...props.userData };
            newObj.country = value;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setCountry(value);
          }}
        />
      </div>
      <div className="rowInput">
        <LabelForInput label=" Ville ou code postal *" htmlFor={city} />
        <input
          className="inputCity"
          type="text"
          name="city"
          value={city}
          onChange={event => {
            const value = event.target.value;
            const newObj = { ...props.userData };
            newObj.city = value;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setCity(value);
          }}
        />
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
    </div>
  );
};

export default ContentLocation;
