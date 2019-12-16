import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import "./reset.css"; // à vérifier

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState(""); // page courrante
  const [answer, setAnswer] = useState({}); // données saisies dans le formulaire
  const [step, setStep] = useState(1); // étape

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

        <Route path="/">{/* <Offers user={user} /> */}</Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
