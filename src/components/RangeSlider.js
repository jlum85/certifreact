import React from "react";
import "../App.css";
import "./ContentProgress.css";

const RangeSlider = props => {
  // on utilise du style inline pour gérer le positionnement relatif sur la barre
  // on a une width de 400 donc on multiplie le % par 4
  const relativeWidth = props.value * 4;
  // et on a un décalage de -25 qui est la moitié de rangeValue
  const relativeLeft = relativeWidth - 25;

  // pour le responsive on gère un affichage plus simple en mode mobile et sans positionnement relatif
  // certains className ne servent qu'à masquer / afficher  suivant le mode mobile / desktop
  return (
    <>
      <div className="rangeContainer">
        <div id="rangeSlider" className="rangeSliderHideMobile">
          <div id="rangeValue" style={{ left: relativeLeft + "px" }}>
            {props.value} %
          </div>
          <div
            id="rangeBarBefore"
            style={{ width: relativeWidth + "px" }}
          ></div>
        </div>
      </div>
      <div className="rangeMobileHideDesktop">
        <div className="rangeValueMobile">{props.value} %</div>
      </div>
    </>
  );
};

export default RangeSlider;
