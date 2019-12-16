import React from "react";
import logo from "../images/logo.jpg";
import "../App.css";

const Header = () => {
  return (
    <header className="pad2070">
      <img className="logo " src={logo} alt="logo"></img>
      <p>Crédit Immobilier : 5 mn pour obtenir le meilleur taux</p>
    </header>
  );
};

export default Header;
