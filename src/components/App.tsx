import React, {useEffect} from "react";
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import {Route} from "react-router";
import "./App.css";

import TerminInput from "../containers/ErfasseTermin";
import TermineVerwalten from "../containers/VerwalteTermine";
import store from "../index";
import {loadMieter, loadTermine} from "../state/backend";
import Button from "@material-ui/core/Button";
import {askForPermissioToReceiveNotifications} from "../push-notification";


const App = () => {
    window.onload = function () {
        askForPermissioToReceiveNotifications();
    };

    useEffect(() => {
        store.dispatch(loadTermine);
        store.dispatch(loadMieter);
    }, []);
    return (
        <Router>
            <div className={"navigation"}>
                <Button>
                    <NavLink to="/">Waschplan</NavLink>
                </Button>
                <Button>
                    <NavLink to="/verwalten">Verwalten</NavLink>
                </Button>
            </div>
            <div>
                <Route path="/" exact component={TerminInput}/>
                <Route path="/verwalten" exact component={TermineVerwalten}/>
            </div>
        </Router>
    );
};

export default App;
