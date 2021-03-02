import React, { useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route } from "react-router";
import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import {initConnectionCheck, loadMieter, loadTermine} from "../integration/integration";
import {useSelector} from "react-redux";
import {selectBackendSynced} from "../state/selectors";

const App = () => {
  useEffect(() => {
    store.dispatch(loadTermine);
    store.dispatch(loadMieter);
    store.dispatch(initConnectionCheck());
  }, []);
    const isSynced: boolean | undefined  = useSelector(selectBackendSynced);
  return (
      <div>
          <p> Synchronisiert {isSynced? 'ja': 'nein'}</p>
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
      </div>

  );
};

export default App;
