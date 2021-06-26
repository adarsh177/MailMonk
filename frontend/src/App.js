import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/home";
import Newdirectmail from "./Screens/Newdirectmail/newdirectmail";
import History from "./Screens/Mail History/history";

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
      </Switch>
    </Router>
  );
}

export default App;
