import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectTermineEnriched } from "../state/selectors";
import { Termin } from "../model/model";
import store from "../index";
import { deleteTermin } from "../integration/integration";

const Termine = () => {
  const termine: Termin[] | undefined = useSelector(selectTermineEnriched);
  
  function removeTermin() {
    store.dispatch(deleteTermin("ff13f2a6-1efd-4b5c-9b6b-dfaf022b1be3"));
  }
  return (
    <ul>
      {termine?.map((termin: Termin) => (
        <li key={termin.id}>
          TerminId: {termin.id} Mieterpartei: {termin.mieterName} Beginn:{" "}
          {termin.terminBeginn} Ende: {termin.terminEnde}
          <Button onClick={removeTermin}>Löschen</Button>
        </li>
      ))}
    </ul>
  );
};

export default Termine;
