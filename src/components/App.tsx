import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route } from "react-router";
import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import { loadMieter, loadTermine } from "../state/backend";
import "./App.css";
import Button from "@material-ui/core/Button";

const App = () => {
  useEffect(() => {
    store.dispatch(loadTermine);
    store.dispatch(loadMieter);
  }, []);
  return (
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
  );
};

export default App;
