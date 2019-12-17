import React from "react";
import "../App.css";
import "./Content.css";

const ContentInput = props => {
  console.log("ContentInput");
  console.log(props);

  // on récupère la liste des options via les props
  //   const getInput = () => {};

  return (
    <div className="content-input">
      <h2>content-input</h2>
    </div>
  );
};

export default ContentInput;
