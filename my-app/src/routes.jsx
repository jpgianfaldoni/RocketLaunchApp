import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";
import MainPage from "./components/MainPage"

export default props => (
    <Router>
        <Route path="/teste" component={MainPage} />
        <Redirect from ='*' to = "/teste" />
    </Router>
)