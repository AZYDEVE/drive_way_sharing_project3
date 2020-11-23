import React from "react";
import logo from "./image/logo.png"
import "./navbar.css";
import { Link } from "react-router-dom";



function Navbar(props) {

  return (
    <nav class="navbar navbar-expand-lg  home-nav">
      <img className="home-logo" src={logo} alt="logo" height="120" />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="home-nav-link">
          <li className="nav-item active" >
            <Link className="nav-link-home" to="/home" style ={props.homeActive}>
              HOME <span class="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link  class="nav-link-MyAppointment" to="/my_appointment" style ={props.MyAppointment}>
              MY APPOINTMENTS
            </Link>
          </li>
          <li className="nav-item">
            <Link  class="nav-link-createpost" to="/createpost" style ={props.createPostActive}>
              CREATE POST
            </Link>
          </li>
          <li className="nav-item">
            <Link  className="nav-link-search" to="/searchpage" style ={props.searchPostActive}>
              SEARCH POST
            </Link>
          </li>
          <li className="nav-item">
          <Link   to="/">
            <button className="homeLogOut" onClick={props.logoutFunction}>
              Log Out
            </button>
          </Link>
             </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;