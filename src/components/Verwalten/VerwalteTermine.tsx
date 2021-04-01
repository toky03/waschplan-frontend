import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import './VerwalteTermine.css'

const TerminTable = lazy(() => import('./TerminTable'))

const VerwalteTermine: React.FC = () => {
    return (
        <div className={'termin-verwaltung'}>
            <Suspense fallback={<div>...lädt Terminverwaltung</div>}>
                <TerminTable />
            </Suspense>
        </div>
    )
}

export default connect()(VerwalteTermine)
