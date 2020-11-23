import React, { useState, useEffect } from "react";
import CreatePost from "./createPostPage/CreatePost.js";
import SearchPage from "./searchPage/SearchPage.js";
import Home from "./homePage/Home.js";
import MakeAppointment from "./makeAppointmentPage/MakeAppointment.js";
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
import MyAppointment from "./AppointmentPage/MyAppointment";

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
  
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Route path="/searchpage" component={SearchPage} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/home" component={Home} />
        <Route path="/make_appointment" component={MakeAppointment} />
        <Route path="/my_appointment" component={MyAppointment} />

        <Route path="/" component={SignIn} />
        <Route path="/App" component={App} />
      </Switch>
    </Router>
  );
}

export default App;
