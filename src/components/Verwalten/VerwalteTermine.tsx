import React from 'react'
import { connect } from 'react-redux'
import TerminTable from './TerminTable'
import './VerwalteTermine.css'

const VerwalteTermine: React.FC = () => {
    return (
        <div className={'termin-verwaltung'}>
            <TerminTable />
        </div>
    )
}

export default connect()(VerwalteTermine)
