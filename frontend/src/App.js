import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Screens/Home/home";
import Newdirectmail from "./Screens/Newdirectmail/newdirectmail";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";


function App() {
  return (
    <Router>

      <Switch>

        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/login">
          <LoginScreen/>
        </Route>
        <Route exact path="/newdirectmail">
          <Newdirectmail/>
        </Route>

      </Switch>


    </Router>
  );
}

export default App;
