import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom'
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
import SyncIcon from '@material-ui/icons/Sync'
import { selectBackendSynced } from '../state/selectors'
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled'
import { green, red } from '@material-ui/core/colors'

const useStyles = makeStyles({
    root: {
        "&:hover": {
            border: "transparent"
        }
    }
})

const App: React.FC = () => {
    const classes = useStyles();
    const isSynced: boolean | undefined = useSelector(selectBackendSynced)

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
                        <Button className={classes.root} component={Link} to="/">Waschplan</Button>
                        {isSynced ? (
                            <SyncIcon style={{ color: green[500] }} />
                        ) : (
                            <SyncDisabledIcon style={{ color: red[500] }} />
                        )}
                        <Button className={classes.root} component={Link} to="/verwalten">Verwalten</Button>
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
