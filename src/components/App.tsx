import React from 'react';
import Termine from './Termine'
import TerminInput from '../containers/ErfasseTermin'

const App = () => (
  <div>
    <h1>Termine</h1>
    <Termine />
    <div>Name und Datum eingeben</div>
    <TerminInput />  
  </div>
)

export default App;
