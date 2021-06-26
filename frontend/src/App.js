import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Screens/Home/home";
import Newdirectmail from "./Screens/Newdirectmail/newdirectmail";


function App() {
  return (
    <Router>

      <Switch>

        <Route exact path="/">
        <Home/>
        </Route>
        <Route exact path="/newdirectmail">
        <Newdirectmail/>
        </Route>

      </Switch>


    </Router>
  );
}

export default App;
