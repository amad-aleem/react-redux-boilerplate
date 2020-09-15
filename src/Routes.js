import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Screens/Home/Home';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/'
                        component={(props) => <Home {...props} {...props.location.state} />}
                    />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}

export default Routes;
