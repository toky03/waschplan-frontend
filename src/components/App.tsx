import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route } from "react-router";
import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import { loadMieter, loadTermine } from "../state/backend";
import "./App.css";
import Link from "@material-ui/core/Link";

const App = () => {
  useEffect(() => {
    store.dispatch(loadTermine);
    store.dispatch(loadMieter);
  }, []);
  return (
    <Router>
      <div className={"navigation"}>
        <Link>
          <NavLink to="/">Waschplan</NavLink>
        </Link>
        <Link>
          <NavLink to="/verwalten">Verwalten</NavLink>
        </Link>
      </div>
      <div>
        <Route path="/" exact component={TerminInput} />
        <Route path="/verwalten" exact component={TermineVerwalten} />
      </div>
  </Router>
  );
};

export default App;
