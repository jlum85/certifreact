import React, { useState, useEffect } from "react";
import "../App.css";
import logoContact from "../images/visuel-desktop-email.jpg";
import infos from "../images/infos.png";
import Cookies from "js-cookie";

const Contact = props => {
  const [mail, setMail] = useState("");
  const [cdg, setCdg] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  // console.log("Contact");
  // console.log(props);

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

  // const setError = msgError => {
  //   setMsgError(msgError);
  //   setIsError(true);
  // };

  // const checkParams = () => {
  //   let result = false;
  //   if (!mail) {
  //     setError("Mail non renseigné");
  //   } else if (!cdg) {
  //     setError("Vous devez accepter les conditions générales de vente");
  //   } else {
  //     setMsgError();
  //     setIsError(false);
  //     result = true;
  //   }
  //   return result;
  // };

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
            const value = event.target.value;
            const newObj = { ...props.userData };
            newObj.mail = value;
            props.saveUserData(newObj); // sauvegarde dans le state général
            setMail(value);
          }}
        />
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
      <p className={"error " + (isError ? "error-show" : "error-hide")}>
        {msgError}
      </p>
    </div>
  );
};

export default Contact;
