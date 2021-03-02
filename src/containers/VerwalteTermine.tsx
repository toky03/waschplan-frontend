import { connect } from "react-redux";
import Termine from "../components/Termine";
import "./VerwalteTermine.css";

const VerwalteTermine = () => {
  return (
    <div className={"termin-verwaltung"}>
      <Termine />
    </div>
  );
};

export default connect()(VerwalteTermine);
