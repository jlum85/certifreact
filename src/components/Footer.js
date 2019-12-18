import React from "react";
import "../App.css";

const Footer = props => {
  return (
    <footer className="pad-tb30 wrapper">
      {props.currentPage === 8 ? <></> : <span>* Champ obligatoire - </span>}
      <span className="mention">Mentions Légales</span>
    </footer>
  );
};

export default Footer;
