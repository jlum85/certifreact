import React, { useState, useEffect } from "react";
import "../App.css";
import "./Content.css";

const getUserValue = userData => {
  console.log("userData.currentPage", userData.currentPage);
  if (userData.currentPage === 1) {
    return userData.radioType;
  } else if (userData.currentPage === 2) {
    return userData.radioState;
  } else if (userData.currentPage === 3) {
    return userData.radioUse;
  } else if (userData.currentPage === 4) {
    return userData.radioSituation;
  }
};

const saveAnswer = (userData, value) => {
  if (userData.currentPage === 1) {
    userData.radioType = value;
  } else if (userData.currentPage === 2) {
    userData.radioState = value;
  } else if (userData.currentPage === 3) {
    userData.radioUse = value;
  } else if (userData.currentPage === 4) {
    userData.radioSituation = value;
  }
  return userData;
};

const getClassName = (index, checkedItem) => {
  let result = "label-radio ";
  // pour gérer la séparation entre les item-radio, on applique un margin-left: 15px;
  // sur tous les éléments sauf le 1er
  if (index !== 0) {
    result += " ml-15";
  }
  if (index === checkedItem) {
    result += " item-radio-selected";
  }
  return result;
};

const ContentRadio = props => {
  const [checkedIndex, setCheckedIndex] = useState(-1);
  console.log("ContentRadio");
  // console.log(props);
  // console.log("checkedIndex", checkedIndex);

  useEffect(() => {
    // dès qu'on change de page, on récupère le choix qui vient de userData
    const index = getUserValue(props.userData);
    console.log("useEffect", index);
    setCheckedIndex(index);
  }, [props.userData.currentPage]);

  // on récupère la liste des options qui viennent de props.radioOption
  const getRadio = () => {
    if (props.radioOption) {
      return props.radioOption.map((item, index) => {
        return (
          <label className={getClassName(index, checkedIndex)} key={index}>
            <input
              type="radio"
              name="radio"
              value={index}
              checked={checkedIndex === index}
              onChange={() => {
                console.log("onChange");

                const newObj = { ...props.userData };
                saveAnswer(newObj, index); // on met à jour l'attribut correspondant de userData
                console.log("index", index);
                console.log("newObj", newObj);
                props.saveUserData(newObj); // sauvegarde dans le state général
                setCheckedIndex(index);
              }}
            />
            {item}
          </label>
        );
      });
    }
  };

  const checkParam = () => {
    console.log("checkParam");
  };

  return (
    <form className="content-radio" onSubmit={checkParam()}>
      {getRadio()}
    </form>
  );
};

export default ContentRadio;
