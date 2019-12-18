import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";
import infos from "../images/infos.png";

const axios = require("axios");

const ContentInput = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  console.log("ContentInput");
  // console.log(props);
  console.log(suggestion);

  // on récupère la liste des options via les props
  //   const getInput = () => {};

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
      <div className="rowInput">
        <label>
          Dans quel pays se situe votre projet ?
          <img className="info" src={infos} alt="infos"></img>
        </label>
        <div>"Ville : " + {city} </div>
        <input
          type="text"
          name="city"
          value={city}
          onChange={event => {
            const value = event.target.value;
            setCity(value);
          }}
        />
      </div>
    </div>
  );
};

export default ContentInput;
