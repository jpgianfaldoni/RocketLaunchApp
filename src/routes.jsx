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
import UpcomingLaunches from "./components/UpcomingLaunches"



export default props => (
    <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/Rocket/*" component={Rocket} />
        <Route exact path="/Upcoming/" component={UpcomingLaunches} />
    </Router>
)