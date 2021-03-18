import React from 'react'
import { connect } from 'react-redux'
import Termine from '../components/Termine'
import './VerwalteTermine.css'

const VerwalteTermine: React.FC = () => {
    return (
        <div className={'termin-verwaltung'}>
            <Termine />
        </div>
    )
}

export default connect()(VerwalteTermine)
