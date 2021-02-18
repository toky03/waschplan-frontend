import { useSelector } from "react-redux";
import { selectTermine } from "../state/selectors";
import { Termin } from "../model/model";

const Termine = () => {
  const termine: Termin[] | undefined = useSelector(selectTermine);
  return (
    <ul>
      {termine?.map((termin: Termin) => (
        <li key={termin.id}>
          TerminId: {termin.id} Mieterpartei: {termin.mieterName} Beginn:{" "}
          {termin.terminBeginn} Ende: {termin.terminEnde}
        </li>
      ))}
    </ul>
  );
};

export default Termine;
