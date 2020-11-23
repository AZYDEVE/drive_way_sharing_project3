import React from "react";
import logo from "./image/logo.png"
import "./navbar.css"



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
            <a className="nav-link-home" href="/home" style ={props.homeActive}>
              HOME <span class="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link-createpost" href="/createpost" style ={props.createPostActive}>
              {" "}
              CREATE POST
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link-search" href="/searchpage" style ={props.searchPostActive}>
              SEARCH POST
            </a>
          </li>
          <li className="nav-item">
          <a  href="/">
            <button className="homeLogOut" onClick={props.logoutFunction}>
              Log Out
            </button>
          </a>
             </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;