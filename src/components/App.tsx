import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route } from "react-router";
import "./App.css";

import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import {
  initConnectionCheck,
  loadMieter,
  loadTermine,
} from "../integration/integration";
import Button from "@material-ui/core/Button";


const App = () => {
  useEffect(() => {
    store.dispatch(loadTermine);
    store.dispatch(loadMieter);
    store.dispatch(initConnectionCheck());
  }, []);
  return (
    <div>
      <Router>
        <div className={"navigation"}>
          <Button>
            <NavLink to="/">Waschplan</NavLink>
          </Button>
          <Button>
            <NavLink to="/verwalten">Verwalten</NavLink>
          </Button>
        </div>
        <div>
          <Route path="/" exact component={TerminInput} />
          <Route path="/verwalten" exact component={TermineVerwalten} />
        </div>
      </Router>
    </div>
  );
};

export default App;
