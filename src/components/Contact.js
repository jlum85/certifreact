import React, { useState, useEffect } from "react";
import "../App.css";
import logoContact from "../images/visuel-desktop-email.jpg";
import ValidationIcon from "../components/ValidationIcon";

import infos from "../images/infos.png";
import Cookies from "js-cookie";
import ShowError from "./ShowError";

const checkMail = email => {
  let result = 0;
  if (!email || email.trim() === "") {
    result = 0;
  } else {
    // expression régulière pour valider le mail
    //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      result = 1;
    } else {
      result = -1;
    }
  }
  // console.log("checkMail", email, result);
  return result;
};

const Contact = props => {
  const [mail, setMail] = useState("");
  const [cdg, setCdg] = useState(false);

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui sont dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      const obj = JSON.parse(cookie);
      setMail(obj.mail);
      setCdg(obj.accept);
    }
  }, [props.userData.currentPage]);

  return (
    <div className="contact">
      <div className="contactBody">
        <div className="infoDevis">
          Un devis vous sera envoyé par mail avec un récapitulatif de votre
          demande.
        </div>
        <img className="logoContact" src={logoContact} alt="Coordonnées"></img>
      </div>

      <div className="rowInput rowGrey">
        <label className="labelInput" htmlFor="mail">
          Adresse e-mail emprunteur *
          <img className="info" src={infos} alt="infos"></img>
        </label>
        <input
          className="inputMail"
          type="email"
          name="mail"
          value={mail}
          onChange={event => {
            const value = event.target.value.trim();
            const newObj = { ...props.userData };
            newObj.mail = value;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setMail(value);
          }}
        />
        <ValidationIcon status={checkMail(mail)} />
      </div>
      <div className="inputCdg">
        <input
          type="checkbox"
          id="cdg"
          name="cdg"
          checked={cdg}
          onChange={e => {
            const newObj = { ...props.userData };
            newObj.accept = e.target.checked;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setCdg(e.target.checked);
          }}
        ></input>
        <label htmlFor="cdg">
          J’accepte de recevoir par email des propositions de Meilleurtaux.
        </label>
      </div>
      <ShowError error={props.error} page={props.userData.currentPage} />
    </div>
  );
};

export default Contact;
