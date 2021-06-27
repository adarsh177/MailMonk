import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/home";
import Newdirectmail from "./Screens/Newdirectmail/newdirectmail";
import Newcampaign from "./Screens/Newcampaign/newcampaign";
import Campaigndetail from "./Screens/Campaigndetail/campaigndetail";
import History from "./Screens/Mail History/history";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/newdirectmail">
                    <Newdirectmail />
                </Route>
                <Route exact path="/history">
                    <History />
                </Route>
                <Route exact path="/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/newcampaign">
                    <Newcampaign />
                </Route>
                <Route exact path="/campaigndetails">
                    <Campaigndetail />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
