import { connect } from "react-redux";
import { loadTermine } from "../state/backend";
import Termine from "../components/Termine";
import store from "../index";

const VerwalteTermine = () => {
  return (
    <div className={"termin-verwaltung"}>
      <div>Hier kommt die Termin-Verwaltung</div>
      <Termine />
    </div>
  );
};

export default connect()(VerwalteTermine);
