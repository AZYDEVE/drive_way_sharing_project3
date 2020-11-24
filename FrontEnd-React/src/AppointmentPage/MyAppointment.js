import React, { useState, useEffect } from "react";
import * as loginToken from "../components/loginTokenAndSignOff";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import CardView from "../components/Card/CardForAppointment";
import "./myAppointment.css"

function MyAppointment() {
  const history = useHistory();

  const [userInfo, setUserinfo] = useState("");
  const [myAppointment, setmyAppointment] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);

  const getPost = async (query, path) => {
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

  const getMyAppointment = async (query, path) => {
    const res = await fetch(path, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await res.json();

    const posts = await getPost({}, "/get_data_query");

    const arr = [];
    Promise.all([data, posts]).then((result) => {
      for (const appointment of result[0]) {
        for (const post of result[1]) {
          if (appointment.post === post._id) {
            let currentAppointment = {
              street: post.street,
              city: post.city,
              state: post.state,
              zip: post.zip,
              img: post.picture,
              start: appointment.start,
              end: appointment.end,
            };

            arr.push(currentAppointment);
          }
        }
      }

      console.log(result[0]);
      console.log(result[1]);
      console.log(arr);

      setmyAppointment(arr);
    });

    return data;
  };

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserinfo(data);
    }

    getMyAppointment({ renter: data }, "/get_appointment_query");
  }, []);

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");
    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });

      if (result.result === false) {
        history.push("/signin");
      }
    } else {
      history.push("/login");
    }
  };

  const handleLogOut = async () => {
    loginToken.deleteLoginToken({ email: userInfo });
    localStorage.removeItem("current-user");
  };

  return (
    <div>
      <Navbar role="navigation" logoutFunction={handleLogOut} MyAppointment={{ borderBottom: "4px solid black" }} />
      <main role="main">
      <h4  className="appointment-title">Your Active Appointments </h4></main> {/* More readable, maybe try adding to the CSS here because 
      it looks kind of plain and just sitting in the middle of the page right now. */}

      <div role="contentinfo" className ="container my-appointment-body">
     
      {myAppointment.map((data) => {
       return(
        <CardView
          ClassName = "cardView-appointment"
          picture={data.img}
          street={data.street}
          city={data.city}
          state={data.state}
          zip={data.zip}
          start={data.start}
          end={data.end}
        />
)
      })}
      </div>
    </div>
  );
}

export default MyAppointment;
