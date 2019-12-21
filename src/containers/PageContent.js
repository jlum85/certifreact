import React, { useState } from "react";

import ContentTitle from "../components/ContentTitle";
import ContentRadio from "../components/ContentRadio";
import ContentLocation from "../components/ContentLocation";
import ContentBudget from "../components/ContentBudget";
import Contact from "../components/Contact";
import Confirming from "../components/Confirming";
import ContentProgress from "../components/ContentProgress";

import { tabPageContent } from "../Global";

const PageContent = props => {
  const [error, setError] = useState({ hasError: false, message: "error" });
  // console.log("PageContent");
  // console.log(props);
  const currentPage = props.userData.currentPage;

  const getComponent = page => {
    // on récupère les informations de la page courante
    const pageContent = tabPageContent[page - 1];
    if (!pageContent) {
      return <></>; // protection si la page n'est pas déclarée
    }

    // si on a un attribut radioOption, on utilise le composant ContentRadio
    if (pageContent.radioOption) {
      return (
        <ContentRadio
          radioOption={pageContent.radioOption}
          userData={props.userData}
          saveUserData={props.saveUserData}
          error={error}
        />
      );

      // si on est en page 5 , on utilise le composant ContentLocation
    } else if (pageContent.num === 5) {
      return (
        <ContentLocation
          input={pageContent.input}
          userData={props.userData}
          saveUserData={props.saveUserData}
          error={error}
        />
      );
      // si on est en page 6 , on utilise le composant ContentBudget
    } else if (pageContent.num === 6) {
      return (
        <ContentBudget
          input={pageContent.input}
          userData={props.userData}
          saveUserData={props.saveUserData}
          error={error}
        />
      );

      // si on est en page 7, on demande les coordonnées avec le composant Contact
    } else if (pageContent.num === 7) {
      return (
        <Contact
          pageContent={pageContent}
          userData={props.userData}
          saveUserData={props.saveUserData}
          error={error}
        />
      );

      // si on est sur la dernière page, on lance la page de confirmation via le composant Confirming
    } else if (pageContent.num === tabPageContent.length) {
      return <Confirming dossier={props.userData.dossier} />;
    }
  };

  return (
    <section className="wrapper content">
      <ContentTitle pageContent={tabPageContent[currentPage - 1]} />

      {/* Chargement du component associé à la page  */}
      {getComponent(currentPage)}

      {currentPage === tabPageContent.length ? (
        <></>
      ) : (
        <ContentProgress
          currentPage={currentPage}
          onPrev={props.onPrev}
          onNext={props.onNext}
          userData={props.userData}
          saveUserData={props.saveUserData}
          setError={setError}
        />
      )}
    </section>
  );
};

export default PageContent;
