import React, { useEffect } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { Route } from 'react-router'
import './App.css'

import ErfasseTermin from '../containers/ErfasseTermin'
import TermineVerwalten from '../containers/VerwalteTermine'
import store from '../index'
import {
    initConnectionCheck,
    initWsConnection,
    loadMieter,
    loadTermine,
} from '../integration/integration'
import Button from '@material-ui/core/Button'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(loadTermine)
        store.dispatch(loadMieter)
        store.dispatch(initConnectionCheck())
        store.dispatch(initWsConnection())
        // TODO entweder muss diese Datei oder die App.tsx im Root verzeichnis umbenennt werden

        // TODO aufraeumen mit callback function;
    }, [])
    return (
        <div>
            <Router>
                <div className={'navigation'}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography>Willkommen beim Waschplan</Typography>
                            <Button><NavLink to="/">Waschplan</NavLink></Button>
                            <Button><NavLink to="/verwalten">Verwalten</NavLink></Button>
                        </Toolbar>
                    </AppBar>              
                </div>
                <div>
                    <Route path="/" exact component={ErfasseTermin} />
                    <Route
                        path="/verwalten"
                        exact
                        component={TermineVerwalten}
                    />
                </div>
            </Router>
        </div>
    )
}

export default App
