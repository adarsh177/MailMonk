import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./Screens/Dashboard/dashboard";
import Newdirectmail from "./Screens/Newdirectmail/newdirectmail";
import Newcampaign from "./Screens/Newcampaign/newcampaign";
import Campaigndetail from "./Screens/Campaigndetail/campaigndetail";
import History from "./Screens/Mail History/history";
import Campaigns from "./Screens/Campaigns/campaign";
import Contacts from "./Screens/Contacts/contact";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import Home from "./Screens/Home/home";
import Playground from "./Screens/Playground";

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
        <Route exact path="/dashboard">
          <DashBoard />
        </Route>
        <Route exact path="/campaign">
          <Campaigns />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/playground">
          <Playground />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
