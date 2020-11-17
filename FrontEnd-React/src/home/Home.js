import React, { useState, useEffect } from "react";
import CardView from "../components/Card";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
/*import UserContext from "./UserContext";*/
import Calendar from "../components/Calendar";
import {useHistory} from 'react-router-dom'
import * as loginToken from "../components/loginTokenAndSignOff";

function Home(props) {
 
   const history = useHistory();

  const [userInfo, setUserinfo ]= useState("");
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

    getInfo({ email: data }, "/get_data_query")
  }, []);

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


 

  const getUserAppointment = () => {};


  const getSelectedPost = (post) => {
    // !!! I need to know which post the user selected. by passing this function as a callback to the active post selection button is my solution
    // while map functions assigns the active posts to each cardview respectively
    // we are passing the respective post as props to the cardview componenet at the same time "post={t}"
    // when the user selects the button, it trigers this callback function and use the props.post as its argument
    // so the post parameter in this function is actually the post setected by the user. This way I know what posts was selected.

  
    setSelectedPost(post);
    /* getInfo({post._id:}, path)*/



    getAppointment({post:post._id}, "/get_appointment_query").then((data)=>{setAppointment(data)})
    

    // put the appointment in calendar
    /* setSelectedPost(post);*/ // put current selected post to useState
  };

  return (
    <>
      <Container>
        <h2>
          <u>Active Post</u>
        </h2>
        {dataStatus ? (
          <div className="grid ">
            {userActivePost.map((t) => (
              <CardView
                parkingFee={t.parkingFee}
                post={t}
                street={t.street}
                name={t._id}
                function={getSelectedPost}
                buttonName ={"appointments"}
              />
            ))}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
      <div className ="container mb-4">
      
        {Object.keys(selectedPost).length === 0 ? (
          ""
        ) : (
          <Calendar selectedPost={selectedPost} appointment={appointment} />
        )}
      
      </div>
    </>
  );
}

export default Home;
