import React, { useState, useEffect } from "react";
import CardView from "../components/Card";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
/*import UserContext from "./UserContext";*/
import Calendar from "../components/Calendar";
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";
import Style from "./home.css";
import logo from "./logo.png"


function Home(props) {
  const history = useHistory();

  const [userInfo, setUserinfo] = useState("");
  const [userActivePost, setUserActivePost] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);

  const [selectedPost, setSelectedPost] = useState({});
  const [appointment, setAppointment] = useState([]);

  // getting the Parkingposts related to the current user" email "
  const getInfo = async (query, path) => {
    const res = await fetch(path, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await res.json();
    setUserActivePost(data);
    setDataStatus(true);
    return data;
  };

  const getAppointment = async (query, path) => {
    const res = await fetch(path, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await res.json();
    return data;
  };

  // at initial loading - getting current user login info
  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserinfo(data);
    }

    getInfo({ email: data }, "/get_data_query");
  }, []);

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });
      console.log(result);
      if (result.result === false) {
        history.push("/signin");
      }
    }
  };

  const getSelectedPost = (post) => {
    // !!! I need to know which post the user selected. by passing this function as a callback to the active post selection button is my solution
    // while map functions assigns the active posts to each cardview respectively
    // we are passing the respective post as props to the cardview componenet at the same time "post={t}"
    // when the user selects the button, it trigers this callback function and use the props.post as its argument
    // so the post parameter in this function is actually the post setected by the user. This way I know what posts was selected.

    setSelectedPost(post);
    /* getInfo({post._id:}, path)*/

    getAppointment({ post: post._id }, "/get_appointment_query").then(
      (data) => {
        setAppointment(data);
      }
    );

    // put the appointment in calendar
    /* setSelectedPost(post);*/ // put current selected post to useState
  };

  const handleLogOut= async ()=>{
    console.log(userInfo.email)
    loginToken.deleteLoginToken({email:userInfo})


  }





  const cardViewStyle = {margin: "20px"}
  const calendarStyle = {width:"50vw", height:"50vh"}

  return (
    <div className="home-container">
      <nav className="home-nav">
      <img className="home-logo" src={logo} alt="logo" height="50"/>
        <ul className="home-nav-link">
          <li>
            <a  href="/home">Home</a>
          </li>
          <li>
            <a  href="/createpost">Create Post</a>
          </li>
          <li>
            <a  href="/searchpage">Search post</a>
          </li>
        </ul>
        <a  href="/#"><button className="homeLogOut" onClick={handleLogOut}>Log Out</button></a>
      </nav>
      <h3 className="home-active-post-title">
        <u>Active Post</u>
      </h3>
      {dataStatus ? (
        <div className="home-cardview ">
          {userActivePost.map((t) => (
            <CardView
              style = {cardViewStyle}
              parkingFee={t.parkingFee}
              post={t}
              street={t.street}
              name={t._id}
              function={getSelectedPost}
              buttonName={"appointments"}
            />
          ))}
        </div>
      ) : (
        <h1 className="home-cardview ">Loading</h1>
      )}

      <div className="home-calendar">
        {Object.keys(selectedPost).length === 0 ? (
          ""
        ) : (
          <Calendar style={calendarStyle} selectedPost={selectedPost} appointment={appointment} />
        )}
      </div>
    </div>
  );
}

export default Home;
