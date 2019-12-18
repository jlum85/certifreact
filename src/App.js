import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import "./reset.css"; // à vérifier

import Header from "./components/Header";
import Footer from "./components/Footer";
import PageContent from "./containers/PageContent";

//const tabPage =
const lastPage = 8; // à mettre dans global.js

// choix par défaut dans les différents écrans à la 1ère connexion
const userDefault = {
  // étape en cours, page 1  par défaut
  currentPage: 1,
  // page 1  : Type de bien , aucune sélection par défaut
  radioType: -1,
  // page 2  : Etat du bien , aucune sélection par défaut
  radioState: -1,
  // page 3  : Usage du bien , aucune sélection par défaut
  radioUse: -1,
  // page 4  : Situation actuelle , aucune sélection par défaut
  radioSituation: -1,
  // Page 5 : localisation du bien
  country: "FRANCE",
  city: "",
  // Page 6 : Montant du bien
  acquisition: 0,
  works: 0,
  // Page 7 : Coordonnées
  mail: "",
  accept: false
};

function App() {
  const [isLoading, setIsLoading] = useState(true); // pour gérer la lecture des cookies
  const [userData, setUserData] = useState({}); // données saisies dans le formulaire
  // console.log("currentPage : " + userData.currentPage);

  useEffect(() => {
    // Au chargement, on doit vérifier l'existence de données utilisateurs dans les cookies
    let cookie = Cookies.get("userData");
    if (cookie) {
      // on met à jour le state à partir des données du cookie
      setUserData(JSON.parse(cookie));
    } else {
      // si pas de cookie, on alimente le state avec les données par défaut
      setUserData(userDefault);
    }
    setIsLoading(false);
  }, []);

  const saveUserData = newObj => {
    // sauvegarde des choix utilisateurs dans les cookies et mise à jour du state
    Cookies.set("userData", JSON.stringify(newObj));
    setUserData(newObj);
  };

  const setPrev = () => {
    if (userData.currentPage > 1) {
      const newObj = { ...userData };
      newObj.currentPage = userData.currentPage - 1;
      saveUserData(newObj);
    }
  };

  const setNext = () => {
    // on s'arrête à l'avant dernière étape , la dernière étant la confirmation
    if (userData.currentPage < lastPage - 1) {
      const newObj = { ...userData };
      newObj.currentPage = userData.currentPage + 1;
      saveUserData(newObj);
    }
  };

  return (
    <Router>
      <Header />

      <Switch>
        {/* <Route path="/offer/:id">
          <Offer user={user} />
        </Route>
        <Route path="/publish">
          <Publish user={user} />
        </Route> */}

        <Route path="/"></Route>
      </Switch>

      {isLoading ? (
        <p className="wrapper loading">Chargement en cours</p>
      ) : (
        <>
          {/* formulaires de saisie, bouton de navigation et progression dans les pages */}
          <PageContent
            currentPage={userData.currentPage}
            onPrev={setPrev}
            onNext={setNext}
            userData={userData}
            saveUserData={saveUserData}
          />
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
