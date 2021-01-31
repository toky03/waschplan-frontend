import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import Termine from './Termine'
import TerminInput from '../containers/ErfasseTermin'
import TermineVerwalten from '../containers/VerwalteTermine'

const App = () => (
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
      <Route path="/" exact component={TerminInput}>
      </Route>
      <Route path="/verwalten" exact component={TermineVerwalten}>
      </Route>
    </div>
</Router>
)

export default App;


/* 
    <h1>Termine</h1>
    <Termine />
    <div>Name und Datum eingeben</div>
    <TerminInput /> 
*/