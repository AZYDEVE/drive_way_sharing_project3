import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "react-bootstrap-time-picker";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import swal from "sweetalert";
import Calendar from "../components/Calendar";
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";
import Navbar from "../components/Navbar/Navbar";
import "./makeAppointment.css";

function MakeAppointmentTesting() {
  const history = useHistory();

  const [driveWayPost, setDrivewayPost] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [datePicked, setDatePicked] = useState("");
  const [existingAppointment, setExistingAppointment] = useState([]);

  const [userInfo, setUserInfo] = useState();

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

  const handleSchduleBtn = async () => {
    const schedule = {
      owner: driveWayPost.email,
      post: driveWayPost._id,
      renter: userInfo,
      start: new Date(
        moment(datePicked, "YYYY/MM/DD").year(),
        moment(datePicked, "YYYY/MM/DD").month(),
        moment(datePicked, "YYYY/MM/DD").date(),
        Math.floor(startTime / 3600),
        Math.floor((startTime % 3600) / 60),
        0
      ),
      end: new Date(
        moment(datePicked, "YYYY/MM/DD").year(),
        moment(datePicked, "YYYY/MM/DD").month(),
        moment(datePicked, "YYYY/MM/DD").date(),
        Math.floor(endTime / 3600),
        Math.floor((endTime % 3600) / 60),
        0
      ),
    };

    setExistingAppointment((oldArray) => [...oldArray, schedule]);
  };

  const confirmSchedule = async () => {
    const lastItem = existingAppointment[existingAppointment.length - 1];
    swal("Your appointment is scheduled", { button: false });
    const res = await fetch("/insert_appointment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastItem),
    });

    history.push("/home");
  };

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });

      if (result.result === false) {
        history.push("/v_signin");
      }
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    initialSetup();
  }, []);

  const initialSetup = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      setUserInfo(data);
    }

    const postRent = await localStorage.getItem("post-picked");

    if (postRent) {
      const currentPost = await JSON.parse(postRent);

      setDrivewayPost(currentPost);

      const data = await getAppointment(
        { post: currentPost._id },
        "/get_appointment_query"
      );

      await setExistingAppointment(data);
    }
  };

  const handleLogOut = async () => {
    loginToken.deleteLoginToken({ email: userInfo });
    localStorage.removeItem("current-user");
  };

  return (
    <>
      <Navbar role="navigation" logoutFunction={handleLogOut} />
     

      <div className="make-appointment-body">
        <div className="make-appointment-date-picker">
          <DayPicker
            aria-label = "date-picker"
            role="date picker"
            selectedDays={datePicked}
            onDayClick={(e) => {
              setDatePicked(e);
            }}
          />
        </div>

        <p className="time-picker-title-start">Start Time </p>
        <TimePicker
          role="timepicker"
          aria-label = "timepicker-start-park-time"
          className="make-appointment-time-picker-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          value={startTime}
          onChange={(e) => {
            setStartTime(e);
          }}
        />
        <p className="time-picker-title-end">End Time </p>
        <TimePicker
        aria-label = "timepicker-end-park-time"
          className="make-appointment-time-picker-end"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          value={endTime}
          onChange={(e) => {
            setEndTime(e);
          }}
        />

        <button className="btn-appointment-schedule" onClick={handleSchduleBtn}>
          Schedule
        </button>
        <button className="btn-appointment-confirm" onClick={confirmSchedule}>
          Confirm
        </button>
        <div className="make-appointment-calendar">
          <Calendar
            selectedPost={driveWayPost}
            appointment={existingAppointment}
            selectedDate={datePicked}
          />
        </div>
      </div>
    </>
  );
}

export default MakeAppointmentTesting;
