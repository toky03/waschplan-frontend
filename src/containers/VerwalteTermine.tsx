import { loadTermine } from '../api/persistence';
import Termine from '../components/Termine';

function VerwalteTermine() {
    loadTermine();
    return (
        <div className={"termin-verwaltung"}>
            <div>Hier kommt die Termin-Verwaltung</div>
            <Termine />
        </div>
    );
}

export default VerwalteTermine;