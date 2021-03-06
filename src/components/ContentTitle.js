import React from "react";
import "../App.css";
import "./Content.css";
import infos from "../images/infos.png";

const ContentTitle = props => {
  return (
    <div className="contentTop">
      <div className="contentTitle">{props.pageContent.title}</div>
      {props.pageContent.logoInfo ? (
        <img className="info" src={infos} alt="infos"></img>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContentTitle;
