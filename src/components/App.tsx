import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route } from "react-router";
import "./App.css";
import Termine from './Termine'  
import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import { loadMieter, loadTermine } from "../state/backend";
import {askForPermissioToReceiveNotifications} from "../push-notification";


const App = () => {
  useEffect(() => {
    store.dispatch(loadTermine);
    store.dispatch(loadMieter);
  }, []);
  return (
    <Router>
      <ul>
        <li>
          <NavLink to="/">Waschplan</NavLink>
        </li>
        <li>
          <NavLink to="/verwalten">Verwalten</NavLink>
        </li>
      </ul>
      <div>
        <Route path="/" exact component={TerminInput} />
        <Route path="/verwalten" exact component={TermineVerwalten} />
      </div>
    </Router>
  );
};

export default App;
