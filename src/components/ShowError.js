import React from "react";
import "../App.css";
import "./Content.css";

const ShowError = props => {
  // on n'affiche que s'il y a une erreur qui correspond à la page courante
  // console.log("ShowError");
  // console.log(props);
  const showError = props.error.hasError && props.page === props.error.page;

  return (
    <p className={"error " + (showError ? "error-show" : "error-hide")}>
      {props.error.message}
    </p>
  );
};

export default ShowError;
