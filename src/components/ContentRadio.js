import React from "react";
import "../App.css";
import "./Content.css";

const ContentRadio = props => {
  console.log("ContentRadio");
  console.log(props);

  // on récupère la liste des options qui viennent de props.radioOption
  const getRadio = () => {
    if (props.radioOption) {
      return props.radioOption.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              name="radio"
              value={index}
              onChange={() => {
                console.log("onChange");
              }}
            />
            {item}
          </div>
        );
      });
    }
  };

  const checkParam = () => {
    console.log("checkParam");
  };

  return (
    <div className="content-radio">
      <form onSubmit={checkParam()}>
        <div className="flex-radio"> {getRadio()}</div>
      </form>
    </div>
  );
};

export default ContentRadio;
