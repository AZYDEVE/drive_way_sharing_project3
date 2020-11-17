import React, { useState, useEffect } from "react";
import CreatePost from "./createPost/CreatePost.js";
import SearchPage from "./searchPage/SearchPage.js";
import Home from "./home/Home.js";
import MakeAppointment from "./makeAppointment/MakeAppointment.js";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useHistory,
} from "react-router-dom";
/*import UserContext from "./components/UserContext";*/
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./loginAndLogOutPage/SignUp";
import SignIn from "./loginAndLogOutPage/Login";

function App() {
  let history = useHistory();

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserInfo(data);
    }
  }, []);

 
  let p = new Promise((resolve, reject) => {});

  return (
    <Router>
      <div>
        
        {window.location.pathname === "/searchpage" ||
          window.location.pathname === "/createpost"  ||
          window.location.pathname === "/home" ? (
            <ul className="header">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/createpost">Create Post</a>
              </li>
              <li>
                <a href="/searchpage">Search post</a>
              </li>
            </ul>
          ): <div></div>}
      </div>
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Route path="/searchpage" component={SearchPage} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/home" component={Home} />
        <Route path="/make_appointment" component={MakeAppointment} />

        <Route path="/" component={SignIn} />
        <Route path="/App" component={App} />
      </Switch>
    </Router>
  );
}

export default App;
