import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import "./reset.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PageContent from "./containers/PageContent";
import BackOffice from "./containers/BackOffice";
import Login from "./containers/Login";
import Estimate from "./containers/Estimate";
import { userDefault, lastPage } from "./Global";

function App() {
  const [isLoading, setIsLoading] = useState(true); // pour gérer la lecture des cookies
  const [userData, setUserData] = useState({}); // données saisies dans le formulaire
  const [token, setToken] = useState(Cookies.get("token") || "");

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
    const dossier = newObj.dossier;
    if (newObj.currentPage === 8 && dossier) {
      // on réinitialise les données pour faire un nouveau devis
      newObj = { ...userDefault };
      newObj.currentPage = 8;
      newObj.dossier = dossier;
    }
    // sauvegarde des choix utilisateurs dans les cookies et mise à jour du state
    Cookies.set("userData", JSON.stringify(newObj), { expires: 1 }); // expire au bout de 1 jour
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
        <Route path="/devis/:id">
          <Estimate token={token} />
        </Route>

        <Route path="/backoffice">
          {/* si pas de token,  on redirige vers  l'écran de login */}
          {!token ? <Redirect to="login" /> : <BackOffice token={token} />}
        </Route>

        <Route path="/login">
          {/* si on a déja le token pas besoin de passer par l'écran de login */}
          {token ? <Redirect to="backoffice" /> : <Login setToken={setToken} />}
        </Route>

        <Route path="/">
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
        </Route>

        {/* <Route path="/"></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
