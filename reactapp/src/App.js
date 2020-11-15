import React from "react";
import SignIn from "./sign_in.js";
import Home from "./home.js";
import SignUp from "./sign_up.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
