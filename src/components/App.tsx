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
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        "&:hover": {
            border: "transparent"
        }
    }
})

const App: React.FC = () => {
    const classes = useStyles();
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
                <AppBar position='static'>
                    <Toolbar className={'Toolbar'}>
                        <Typography className={'Typography'}>Willkommen beim Waschplan / CAS Abschlussarbeit von Marco Jakob, Remzi Atesci und Michael Egli</Typography>
                        <Button className={classes.root}><NavLink style={{ textDecoration: 'none'}} to="/">Waschplan</NavLink></Button>
                        <Button className={classes.root}><NavLink style={{ textDecoration: 'none' }} to="/verwalten">Verwalten</NavLink></Button>
                    </Toolbar>
                    </AppBar>              
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
