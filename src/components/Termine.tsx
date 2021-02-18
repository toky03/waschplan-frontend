import {connect, useSelector} from 'react-redux';
import {Termin} from "../api/types";

const Termine = () => {

    const termine = useSelector((state: any) => state.termineLoad);
    return (
        <ul>
            {termine?.map((termin: Termin) => <li
                key={termin.id}>TerminId: {termin.id} ParteiId: {termin.parteiId} Beginn: {termin.terminBeginn} Ende: {termin.terminEnde}</li>)}
        </ul>
    )
};


export default Termine;
