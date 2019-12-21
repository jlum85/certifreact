import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { API_BACK } from "../Global";
import "../App.css";

const API = API_BACK + "user/signin";

const Login = props => {
  const history = useHistory();
  const [password, setPassword] = useState("tothemoon");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  const setError = msgError => {
    setMsgError(msgError);
    setIsError(true);
  };

  const checkParams = () => {
    let result = false;
    if (!password) {
      setError("Mot de passe non renseigné");
    } else {
      setMsgError("");
      setIsError(false);
      result = true;
    }
    return result;
  };

  const getLogin = async () => {
    if (checkParams()) {
      try {
        const response = await axios.post(
          API,
          { password: password },
          { headers: { Accept: "application/json" } }
        );
        const result = response.data;
        if (result && result.token) {
          Cookies.set("token", result.token, { expires: 1 }); // expire au bout de 1 jour
          props.setToken(result.token);
          history.push("/backoffice");
        } else {
          setError("Mot de passe incorrect");
        }
      } catch (err) {
        console.log(err.message);
        setError("Mot de passe incorrect");
      }
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
