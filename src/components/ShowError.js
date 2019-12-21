import React from "react";
import "../App.css";
import "./Content.css";

const ShowError = props => {
  const error = props.error;

  return (
    <p className={"error " + (error.hasError ? "error-show" : "error-hide")}>
      {error.message}
    </p>
  );
};

export default ShowError;
