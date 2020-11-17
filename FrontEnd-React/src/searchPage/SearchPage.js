import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import "./searchPage.css";
import { Redirect } from "react-router-dom";
import CardView from "../components/Card";

import {useHistory} from 'react-router-dom'
import * as loginToken from "../components/loginTokenAndSignOff";


function SearchPage(props) {

  const history = useHistory();

  const [posts, setPost] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [sendPostData, setSendPostData] = useState("");

  

  const getInfo = async () => {
    const res = await fetch("/get_data", { method: "GET" });
    const data = await res.json();
    setPost(data);
    setDataStatus(true);
  };

  useEffect(() => {
    getInfo();
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


  const goToPost = (post) => {
    
    setSendPostData(post);
    localStorage.setItem("post-picked", JSON.stringify(post)); /*storing data in Local and retreive in calendard*/
  };

  if (sendPostData !== "") {
    return (
      <Redirect to="/make_appointment" />
    );
  }

  /*{posts.map(cardDetail)*/
  return (
    <Container>
      <input
        className="col-md-3 m-3 mt-5"
        type="text"
        placeholder="Search By Zip Code"
      />
      {dataStatus ? (
        <div className="grid ">
          {posts.map((t) => (
            <CardView
              post={t}
              parkingFee={t.parkingFee}
              street={t.street}
              name={t._id}
              function={goToPost}
              buttonName="Schedule for Parking"
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
     
    </Container>
  );
}

export default SearchPage;
