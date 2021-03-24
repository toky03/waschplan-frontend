import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Link } from 'react-router-dom'
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
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import { selectBackendSynced } from '../state/selectors'
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled'
import { green, red } from '@material-ui/core/colors'
import { ErrorAlert } from '../containers/ErrorStore'

export const buttonStyles = makeStyles({
    root: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: '#846750',
        '&:hover': {
            border: 'transparent',
        },
    },
})

const App: React.FC = () => {
    const classes = buttonStyles()
    const isSynced: boolean | undefined = useSelector(selectBackendSynced)

    useEffect(() => {
        store.dispatch(loadTermine)
        store.dispatch(loadMieter)
        store.dispatch(initConnectionCheck())
        store.dispatch(initWsConnection())

        // TODO aufraeumen mit callback function;
    }, [])
    return (
        <div>
            <Router>
                <AppBar position="static">
                    <Toolbar className={'Toolbar'}>
                        <Button
                            className={classes.root}
                            component={Link}
                            to="/"
                            size="large"
                        >
                            Waschplan
                        </Button>
                        {isSynced ? (
                            <SyncIcon style={{ color: green[500] }} />
                        ) : (
                            <SyncDisabledIcon style={{ color: red[500] }} />
                        )}
                        <Button
                            className={classes.root}
                            component={Link}
                            to="/verwalten"
                            size="large"
                        >
                            Verwalten
                        </Button>
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
            <ErrorAlert />
        </div>
    )
}

export default App
