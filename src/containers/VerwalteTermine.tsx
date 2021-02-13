import {connect, useDispatch} from "react-redux";
import { loadTermine } from '../api/backend';
import Termine from '../components/Termine';

const VerwalteTermine = () => {
    const dispatch = useDispatch();
    dispatch(loadTermine());
    return (
        <div className={"termin-verwaltung"}>
            <div>Hier kommt die Termin-Verwaltung</div>
            <Termine />
        </div>
    );
}

export default connect()(VerwalteTermine);