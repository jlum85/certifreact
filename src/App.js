import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Cookies from "js-cookie";
import "./App.css";
import "./reset.css"; // à vérifier

import Header from "./components/Header";
import Footer from "./components/Footer";
import Page from "./containers/Page";

//const tabPage =
const lastPage = 8; // à mettre dans global.js

function App() {
  const [currentPage, setCurrentPage] = useState(1); // page courrante
  // const [answer, setAnswer] = useState({}); // données saisies dans le formulaire
  console.log("currentPage : " + currentPage);

  const setPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setNext = () => {
    // on s'arrête à l'avant dernière étape , la dernière étant la confirmation
    if (currentPage < lastPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Router>
      <Header />

      <Switch>
        {/* <Route path="/offer/:id">
          <Offer user={user} />
        </Route>
        <Route path="/offers">
          <Offers user={user} />
        </Route>

        <Route path="/sign_up">
          <SignUp logIn={logIn} />
        </Route>
        <Route path="/publish">
          <Publish user={user} />
        </Route> */}

        <Route path="/"></Route>
      </Switch>

      {/* bouton de navigation dans les pages et progression */}
      <Page currentPage={currentPage} onPrev={setPrev} onNext={setNext} />
      <Footer />
    </Router>
  );
}

export default App;
