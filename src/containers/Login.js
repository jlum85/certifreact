import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "../App.css";

const API_BACK = "http://localhost:3000/user/signin";

const Login = props => {
  console.log("Login");
  console.log(props);
  const history = useHistory();

  const [password, setPassword] = useState("tothemoon");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  const setError = msgError => {
    setMsgError(msgError);
    setIsError(true);
  };

  const onAnswer = response => {
    const result = response.data;
    if (result && result.token) {
      Cookies.set("token", result.token, { expires: 1 }); // expire au bout de 1 jour
      props.setToken(result.token);
      history.push("/backoffice");
    } else {
      setError("Mot de passe incorrect");
    }
    return result;
  };

  const onError = error => {
    const result = error.response;
    if (result) {
      if (result.data) {
        console.log(result.data);
      } else {
        console.log(result);
      }
    } else {
      console.log(error);
    }
    setError("Mot de passe incorrect");
  };

  const checkParams = () => {
    let result = false;
    if (!password) {
      setError("Mot de passe non renseigné");
    } else {
      setMsgError();
      setIsError(false);
      result = true;
    }
    return result;
  };

  const getLogin = () => {
    if (checkParams()) {
      axios
        .post(
          API_BACK,
          {
            password: password
          },
          { headers: { Accept: "application/json" } }
        )
        .then(onAnswer)
        .catch(onError);
    }
  };

  return (
    <section className="wrapper center">
      <form
        className="formConnect"
        onSubmit={event => {
          event.preventDefault();
          getLogin();
        }}
      >
        <h2 className="connexion">Connexion au BackOffice</h2>
        <div className="signInput">
          <p>Mot de passe</p>
          <input
            className="inputPassword"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flexBtn">
          <p className={"error " + (isError ? "error-show" : "error-hide")}>
            {msgError}
          </p>
          <button className="signBtn">Se connecter</button>
        </div>
      </form>
    </section>
  );
};
export default Login;
