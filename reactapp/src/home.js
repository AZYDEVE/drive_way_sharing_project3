import React from "react";
import "./css/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="navbar">
        <Link to="/home">
          <button type="button">DriveWay Sharing</button>
        </Link>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
        <Link to="/signin">
          <button type="button">Sign In</button>
        </Link>
      </div>
      <section id="section1">
        <div className="main">
          <header>
            Ready to book your DriveWay?
            <br />
            Join us today!
            <a class="scroll" href="#section2">
              <span></span>Scroll
            </a>
          </header>
        </div>
      </section>
      <section id="section2">
        <a className="scroll" href="#section1">
          <span></span>Scroll
        </a>
        <div className="main" id="second">
          <header>How does it work?</header>
          <p>
            We want to solve big cities's parking lot finding problems.
            So we create this DriveWay Sharing site to let people share 
            their spare space together!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
