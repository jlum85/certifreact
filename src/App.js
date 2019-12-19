import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import "./reset.css"; // à vérifier

import Header from "./components/Header";
import Footer from "./components/Footer";
import Confirming from "./components/Confirming";
import PageContent from "./containers/PageContent";
import BackOffice from "./containers/BackOffice";
import { userDefault, lastPage } from "./Global";

function App() {
  const [isLoading, setIsLoading] = useState(true); // pour gérer la lecture des cookies
  const [userData, setUserData] = useState({}); // données saisies dans le formulaire

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
    if (userData.currentPage < lastPage) {
      const newObj = { ...userData };
      newObj.currentPage = userData.currentPage + 1;
      saveUserData(newObj);
    }
  };

  return (
    <Router>
      <Header
        onClick={() => {
          const newObj = { ...userData };
          newObj.currentPage = 1; // retour sur la 1ère page
          saveUserData(newObj);
        }}
      />

      <Switch>
        <Route path="/backoffice">
          <BackOffice />
        </Route>
        <Route path="/confirming">
          <Confirming dossier={12345} />
        </Route>

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
          <Footer currentPage={userData.currentPage} />
        </>
      )}
    </Router>
  );
}

export default App;
