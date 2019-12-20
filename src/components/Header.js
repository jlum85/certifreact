import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.jpg";
import "../App.css";

const Header = props => {
  // console.log("Header");
  // console.log(props);
  const history = useHistory();

  return (
    <header className="head df-sb pad-tb30 wrapper">
      <div className="headerLeft df-col">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => {
            props.onClick(); // pour revenir à la 1ère page
            history.push("/");
          }}
        ></img>
        <p>Crédit Immobilier : 5 mn pour obtenir le meilleur taux</p>
      </div>
      <div className="orange-btn" onClick={() => history.push("/login")}>
        BackOffice
      </div>
    </header>
  );
};

export default Header;
