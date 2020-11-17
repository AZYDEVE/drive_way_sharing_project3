import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "react-bootstrap-time-picker";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import swal from "sweetalert";
import Calendar from "../components/Calendar";
import {useHistory} from 'react-router-dom'
import * as loginToken from "../components/loginTokenAndSignOff";

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
    

    setExistingAppointment(oldArray => [...oldArray, schedule])


  };


  const confirmSchedule= async ()=>{

  const lastItem = existingAppointment[existingAppointment.length - 1]
   swal("Your appointment is scheduled", { button: false });
  const res = await fetch("/insert_appointment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastItem),
    });

  history.push("/home" )
   
  };


   //check database if the user is in the currently login collection
  useEffect(()=>{
    check()

  },[])

    const check =async ()=>{

    const data = localStorage.getItem("current-user");

    if (data) { 
      const result = await loginToken.checkCurrentLogin({email:data})
      console.log(result)
      if (result.result === false){
        
           history.push("/v_signin" )
      }

    }
}


  useEffect(() => {
    initialSetup();
  }, []);

  const initialSetup = async () => {
    const data = localStorage.getItem("current-user");
    console.log(data)
    if (data) {
    
     setUserInfo(data);

    }

    const postRent = await localStorage.getItem("post-picked");

    console.log(postRent);

    if (postRent) {
      const currentPost = await JSON.parse(postRent);

      setDrivewayPost(currentPost);

      const data = await getAppointment(
        { post: currentPost._id },
        "/get_appointment_query"
      );

      console.log(data);
      console.log(driveWayPost._id);
      await setExistingAppointment(data);
    }
  };







  return (
    <div>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 offset-2 justify-content-end ">
            <DayPicker
              selectedDays={datePicked}
              onDayClick={(e) => {
                setDatePicked(e);
              }}/>

            <h5>Start Time </h5>
            <TimePicker
              className="col col-lg-6"
              start="0"
              end="24"
              name="StartTime"
              step={30}
              value={startTime}
              onChange={(e) => {
                setStartTime(e);
              }}
            />
            <h5 className="mt-3">End Time </h5>
            <TimePicker
              className="col col-lg-6"
              start="0"
              end="24"
              name="StartTime"
              step={30}
              value={endTime}
              onChange={(e) => {
                setEndTime(e);
              }}
            />
            <div className="row">
              <div className="col justify-content-center">
                <button className="btn-primary m-3" onClick={handleSchduleBtn}>
                  Schedule
                </button>
                <button className="btn-primary m-3" onClick={confirmSchedule}>Confirm</button>
              </div>
            </div>
          </div>

          <div className="col-6 ">
            <Calendar
              selectedPost={driveWayPost}
              appointment={existingAppointment}
              selectedDate={datePicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeAppointmentTesting;
