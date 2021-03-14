import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectTermineEnriched } from "../state/selectors";
import { Termin } from "../model/model";

const Termine = () => {
  const termine: Termin[] | undefined = useSelector(selectTermineEnriched);
  
  function deleteTermin(terminId: string) {
    confirm("Willst Du den Termin wirklich löschen?" + terminId);
  }
  return (
    <ul>
      {termine?.map((termin: Termin) => (
        <li key={termin.id}>
          TerminId: {termin.id} Mieterpartei: {termin.mieterName} Beginn:{" "}
          {termin.terminBeginn} Ende: {termin.terminEnde}
          <Button onClick={() => deleteTermin(termin.id)}>Löschen</Button>
        </li>
      ))}
    </ul>
  );
};

export default Termine;
