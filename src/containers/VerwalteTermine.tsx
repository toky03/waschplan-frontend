import React from "react";
import { connect } from "react-redux";
import Termine from "../components/Termine";

const VerwalteTermine = () => {
  return (
    <div className={"termin-verwaltung"}>
      <div>Hier kommt die Termin-Verwaltung</div>
      <Termine />
    </div>
  );
};

export default connect()(VerwalteTermine);
