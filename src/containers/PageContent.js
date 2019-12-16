import React from "react";

import ContentTitle from "../components/ContentTitle";
import ContentRadio from "../components/ContentRadio";
import ContentInput from "../components/ContentInput";
import Contact from "../components/Contact";
import Confirming from "../components/Confirming";
import ContentProgress from "../components/ContentProgress";

const tabPageContent = [
  { num: 1, title: "TYPE DE BIEN", radioOption: ["MAISON", "APPARTEMENT"] },
  { num: 2, title: "ETAT DU BIEN", radioOption: ["ANCIEN", "NEUF"] },
  {
    num: 3,
    title: "USAGE DU BIEN",
    radioOption: [
      "Résidence principale",
      "Résidence secondaire",
      "Investissemnt locatif"
    ]
  },
  {
    num: 4,
    title: "Votre situation actuelle",
    radioOption: [
      "Locataire",
      "Propriétaire",
      "Bénéficiaire d'un logement de fonction",
      "Hébergé à titre gratuit"
    ]
  },
  {
    num: 5,
    title: "Où se situe le bien à financer ?",
    input: [
      { title: "Dans quel pays se situe votre projet ?*", type: "country" },
      { title: "Ville ou code postal*", type: "city" }
    ],
    description: `La connaissance du code postal du bien permettra de calculer les frais de notaire selon les conditions en vigueur dans le département concerné.
    Si vous êtes en recherche de bien sur plusieurs communes, indiquez une commune ciblée.`
  },
  {
    num: 6,
    title: "DÉFINISSONS LE MONTANT DE VOTRE PROJET",
    input: [
      { title: "Montant estimé de votre acquisition*", type: "number" },
      { title: "Montant estimé des travaux", type: "number" },
      { title: "Frais de notaire*", type: "notaryFees" },
      { title: "Budget total estimé du projet", type: "total" }
    ]
  },
  {
    num: 7,
    title: "Vos coordonnées"
  },
  {
    num: 8,
    title: "Et voilà, le formulaire est terminé !"
  }
];

const PageContent = props => {
  console.log("Page");
  console.log(props);
  const currentPage = props.currentPage;

  const getComponent = page => {
    // on récupère les informations de la page courante
    const pageContent = tabPageContent[page - 1];
    if (!pageContent) {
      return <></>; // protection si la page n'est pas déclarée
    }

    // si on a un attribut radioOption, on utilise le composant ContentRadio
    if (pageContent.radioOption) {
      return <ContentRadio radioOption={pageContent.radioOption} />;

      // si on a un attribut input, on utilise le composant ContentInput
    } else if (pageContent.input) {
      return <ContentInput pageContent={pageContent.input} />;

      // si on est sur l'avant dernière page, on demande les coordonnées avec le composant Contact
    } else if (pageContent.num === tabPageContent.length - 1) {
      return <Contact pageContent={pageContent} />;

      // si on est sur la dernière page, on lance la page de confirmation via le composant Confirming
    } else if (pageContent.num === tabPageContent.length) {
      return <Confirming pageContent={pageContent} />;
    }
  };

  return (
    <section className="wrapper content">
      <ContentTitle pageContent={tabPageContent[props.currentPage - 1]} />

      {getComponent(currentPage)}

      <ContentProgress
        currentPage={props.currentPage}
        onPrev={props.onPrev}
        onNext={props.onNext}
      />
    </section>
  );
};

export default PageContent;