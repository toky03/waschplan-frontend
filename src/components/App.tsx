import React from 'react';
import "./App.css";
import Termine from './Termine'
import TerminInput from '../containers/ErfasseTermin'
import {askForPermissioToReceiveNotifications} from "../push-notification";

const App = () => (
  <div>
    <h1>Termine</h1>
    <Termine />
    <div>Name und Datum eingeben</div>
    <TerminInput />
      <div className="App">
          <button onClick={askForPermissioToReceiveNotifications} >
              Hier klicken, um Push-Notifikation zu testen
          </button>
      </div>
  </div>

)

export default App;
