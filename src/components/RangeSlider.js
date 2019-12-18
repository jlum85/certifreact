import React from "react";
import "../App.css";
import "./ContentProgress.css";

const RangeSlider = props => {
  // on utilise du style inline pour gérer le positionnement relatif sur la barre
  // on a une width de 400 donc on multiplie le % par 4
  const relativeWidth = props.value * 4;
  // et on a un décalage de -25 qui est la moitié de rangeValue
  const relativeLeft = relativeWidth - 25;

  return (
    <div className="rangeContainer">
      <div id="rangeSlider">
        <div id="rangeValue" style={{ left: relativeLeft + "px" }}>
          {props.value} %
        </div>
        <div id="rangeBarBefore" style={{ width: relativeWidth + "px" }}></div>
      </div>
    </div>
  );
};

export default RangeSlider;
