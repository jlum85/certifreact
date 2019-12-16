import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Cookies from "js-cookie";
import "./App.css";
import "./reset.css"; // à vérifier

import Header from "./components/Header";
import Footer from "./components/Footer";
import PageContent from "./containers/PageContent";

//const tabPage =
const lastPage = 8; // à mettre dans global.js

function App() {
  const [currentPage, setCurrentPage] = useState(1); // page courante
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
      {/* <div className="wrapper"> */}
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

      {/* bouton de navigation dans les pages et progression */}
      <PageContent
        currentPage={currentPage}
        onPrev={setPrev}
        onNext={setNext}
      />
      <Footer />
      {/* </div> */}
    </Router>
  );
}

export default App;
