import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./searchPage.css";
import { Redirect } from "react-router-dom";
import CardView from "../components/Card/Card";
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";
import Navbar from "../components/Navbar/Navbar";

function SearchPage(props) {
  const history = useHistory();

  const [posts, setPost] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [sendPostData, setSendPostData] = useState("");
  const [zipinfo, setZipinfo] = useState("");

  const getInfo = async () => {
    const res = await fetch("/get_data", { method: "GET" });
    const data = await res.json();
    setPost(data);
    setDataStatus(true);
  };

  const searchByZipCode = async () => {
    const res = await fetch("/get_data_query", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip: zipinfo }),
    });
    const data = await res.json();
   
    setPost(data);
 
    /* setDataStatus(true);*/
    return data;
  };

  const handleZipInputChange = (event) => {
    setZipinfo(event.target.value);
   
  };

  useEffect(() => {
    getInfo();
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
      history.push("/signin");
    }
  };

  const handleLogOut = async () => {
    const data = localStorage.getItem("current-user");
    await loginToken.deleteLoginToken({ email: data });
    await localStorage.removeItem("current-user");
  };

  const goToPost = (post) => {
    setSendPostData(post);
    localStorage.setItem(
      "post-picked",
      JSON.stringify(post)
    ); /*storing data in Local and retreive in calendard*/
  };

  if (sendPostData !== "") {
    return <Redirect to="/make_appointment" />;
  }

  const cardViewStyle = {
    margin: "20px",
    borderRadius: "20px ",
    overflow: "hidden",
  };

  /*{posts.map(cardDetail)*/
  return (
    <div className="searchpost-page-body">
      <Navbar
        searchPostActive={{ borderBottom: "4px solid black" }}
        logoutFunction={handleLogOut}
      />

      <div className="searchpost-filter-area">
        <input
          aria-label ="search-field-zipcode"
          className="searpost-input-zip"
          type="text"
          placeholder="Search By Zip Code"
          onChange={handleZipInputChange}
        />

        <button className="btn-search" onClick={searchByZipCode}>
          Seach
        </button>
        <button className="btn-reset" onClick={getInfo}>
          Reset
        </button>
      </div>

      <Container>
        {dataStatus ? (
          <div className="grid ">
            {posts.map((t) => (
              <CardView
                style={cardViewStyle}
                picture={t.picture}
                post={t}
                parkingFee={t.parkingFee} {/* Might look more professional to put something like "Hourly Fee: $5.00" or "Rental Fee: $5.00/hr" */}

                street={t.street} {/* Might be nice to have the city and zip code as well, also to have consistent capitalization across all. */}
                name={t._id}
                function={goToPost}
                buttonName="Make Appointment"
              />
            ))}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
    </div>
  );
}

export default SearchPage;
