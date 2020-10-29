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
import Rocket from "./components/Rocket"


export default props => (
    <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/Rocket/*" component={Rocket} />
    </Router>
)