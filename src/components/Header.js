import React from "react";
import logo from "../images/logo.jpg";
import "../App.css";

const Header = props => {
  // console.log("Header");
  // console.log(props);

  return (
    <header className="head">
      <div className="pad-tb30 wrapper">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => {
            props.onClick();
          }}
        ></img>
        <p>Crédit Immobilier : 5 mn pour obtenir le meilleur taux</p>
      </div>
    </header>
  );
};

export default Header;
