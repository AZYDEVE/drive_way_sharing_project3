import React from "react";
import { useState, useEffect, useRef } from "react";
import { Container, Form, Col, option } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";
import firebase from "../utility/fireDB/firebaseConnect";
import "./createPost.css";
import Navbar from "../components/Navbar/Navbar";

function CreatePost() {


  const storage = firebase.storage();
  const history = useHistory();

  const [userInfo, setUserInfo] = useState();
  console.log(userInfo)
  const [formValue, setFormValue] = useState({
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    parkingFee: "",
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    MondayStartTime: "",
    TuesdayStartTime: "",
    WednesdayStartTime: "",
    ThursdayStartTime: "",
    FridayStartTime: "",
    SaturdayStartTime: "",
    SundayStartTime: "",
    MondayEndTime: "",
    TuesdayEndTime: "",
    WednesdayEndTime: "",
    ThursdayEndTime: "",
    FridayEndTime: "",
    SaturdayEndTime: "",
    SundayEndTime: "",
    userId: "",
    picture: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserInfo(data);
      setFormValue({
        ...formValue,
        email: data,
      });
    }
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
   
    await loginToken.deleteLoginToken({ email: userInfo });
    await localStorage.removeItem("current-user");
  };



  const handleChanges = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const stateAbbreviations = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const handleChangeCheckBox = (event) => {
    setFormValue({
      ...formValue,
      [event.target.id]: event.target.checked,
    });

   
  };

  const handleStartTimeMonday = (time) => {
    setFormValue({
      ...formValue,
      MondayStartTime: time,
    });
  };

  const handleStartTimeTuesday = (time) => {
    setFormValue({
      ...formValue,
      TuesdayStartTime: time,
    });
  };
  const handleStartTimeWednesday = (time) => {
    setFormValue({
      ...formValue,
      WednesdayStartTime: time,
    });
  };
  const handleStartTimeThrusday = (time) => {
    setFormValue({
      ...formValue,
      ThursdayStartTime: time,
    });
  };
  const handleStartTimeFriday = (time) => {
    setFormValue({
      ...formValue,
      FridayStartTime: time,
    });
  };
  const handleStartTimeSaturday = (time) => {
    setFormValue({
      ...formValue,
      SaturdayStartTime: time,
    });
  };
  const handleStartTimeSunday = (time) => {
    setFormValue({
      ...formValue,
      SundayStartTime: time,
    });
  };

  const handleEndTimeMonday = (time) => {
    setFormValue({
      ...formValue,
      MondayEndTime: time,
    });
  };

  const handleEndTimeTuesday = (time) => {
    setFormValue({
      ...formValue,
      TuesdayEndTime: time,
    });
  };

  const handleEndTimeWednesday = (time) => {
    setFormValue({
      ...formValue,
      WednesdayEndTime: time,
    });
  };

  const handleEndTimeThursday = (time) => {
    setFormValue({
      ...formValue,
      ThursdayEndTime: time,
    });
  };

  const handleEndTimeFriday = (time) => {
    setFormValue({
      ...formValue,
      FridayEndTime: time,
    });
  };

  const handleEndTimeSaturday = (time) => {
    setFormValue({
      ...formValue,
      SaturdayEndTime: time,
    });
  };

  const handleEndTimeSunday = (time) => {
    setFormValue({
      ...formValue,
      SundayEndTime: time,
    });
  };

  const handlePictureUrl = async (url) => {
    setFormValue({
      ...formValue,
      picture: url,
    });
  };

  // pick the image , display the image, and than upload to firebase
  const [imagePickedFile, setImgePickedFile] = useState(null);
  const [temImageFileAfterPicked, setTemImageFileAfterPicked] = useState(null);

  const handleFile = async (event) => {
  
    event.persist();
    const picUrl = event.target.files[0];
    setImgePickedFile(picUrl);

    if (picUrl) {
      await setTemImageFileAfterPicked(URL.createObjectURL(picUrl));
    }
  };

  const uploadFirebaseAndGetUrl = async () => {
    const unqiRef = new Date().getTime();
   

    if (temImageFileAfterPicked) {
      storage
        .ref(`picture/${unqiRef}`)
        .put(imagePickedFile)
        .on(
          "state_changed",
          (snapshot) => {},
          (error) => {
          
          },
          async () => {
            const urlss = await storage
              .ref(`picture/${unqiRef}`)
              .getDownloadURL();
           

            formValue.picture = urlss;
            // update picture url to form

          

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formValue),
            };
            await fetch("/insert_newpost", requestOptions)
              .then(async (response) => {
                Swal.fire({
                  icon:"success",
                  text:"You post is successfully published"
                }).then(history.push(history.push("/home")));
                const data = await response;
              

                
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
    }
  };

  const createPost = async () => {
    const picUrl = await uploadFirebaseAndGetUrl();
  };

  const fileInput = useRef("")
  const fileUploadTrigerInput = ()=>{
    fileInput.current.click()
  }

  return (
    <div className="createpost-body">
      <Navbar createPostActive={{ borderBottom: "4px solid black" }} 
       logoutFunction={handleLogOut}/>
      <Container>
        <Form>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Street</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name="street"
              value={formValue.street}
              onChange={handleChanges}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group
              className="col-sm-3 city-title-input"
              as={Col}
              controlId="formGridCity"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="New York"
                name="city"
                value={formValue.city}
                onChange={handleChanges}
              />
            </Form.Group>

            <Form.Group
              className="col-sm-3 state-title-input"
              as={Col}
              controlId="formGridState"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                name="state"
                value={formValue.state}
                onChange={handleChanges}
              >
                {stateAbbreviations.map((st) => (
                  <option>{st}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="col-sm-2 zip-title-input"
              controlId="formGridZip"
            >
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="number"
                name="zip"
                value={formValue.zip}
                onChange={handleChanges}
              />
            </Form.Group>

            <Form.Group
              className="col-sm-2 fee-title-input"
              controlId="formGridAddress1"
            >
              <Form.Label>Parking Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="$"
                name="parkingFee"
                value={formValue.parkingFee}
                onChange={handleChanges}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>

      <div className=" date-time-picture-container">
        <h5 className="date-time-title">
          Set Time For Renting Out Your Drive Way
        </h5>

        <input
          aria-label="monday-checkbox"
          className="mon-check"
          type="checkbox"
          id="Monday"
          onChange={handleChangeCheckBox}
        />
        <label className="mon-lable">Monday</label>

        <h6 className="start-title">Start </h6>
        <h6 className="end-title">End</h6>

        <TimePicker
         aria-label="monday-time-picker-start"
          className="mon-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          style ={formValue.Monday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Monday ? false : true}
          value={formValue.MondayStartTime}
          onChange={handleStartTimeMonday}
        />

        <TimePicker
         aria-label="monday-time-picker-end"
          className=" mon-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
          style ={formValue.Monday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Monday ? false : true}
          value={formValue.MondayEndTime}
          onChange={handleEndTimeMonday}
        />

        <input
          aria-label="tuesday-checkbox"
          className="tue-checkbox"
          type="checkbox"
          id="Tuesday"
          onChange={handleChangeCheckBox}
        />
        <label className="tue-label">Tuesday</label>

        <TimePicker
         aria-label="tuesday-time-picker-start"
          className="tue-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          style ={formValue.Tuesday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Tuesday ? false : true}
          value={formValue.TuesdayStartTime}
          onChange={handleStartTimeTuesday}
        />

        <TimePicker
         aria-label="tuesday-time-picker-end"
          className="tue-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
           style ={formValue.Tuesday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Tuesday ? false : true}
          value={formValue.TuesdayEndTime}
          onChange={handleEndTimeTuesday}
        />

        <input
        aria-label="wednesday-checkbox"
          className="wed-checkbox"
          type="checkbox"
          id="Wednesday"
          onChange={handleChangeCheckBox}
        />
        <label className="wed-label">Wednesday</label>

        <TimePicker
           aria-label="wednesday-time-picker-start"
          className="wed-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
           style ={formValue.Wednesday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Wednesday ? false : true}
          value={formValue.WednesdayStartTime}
          onChange={handleStartTimeWednesday}
        />

        <TimePicker
         aria-label="wednesday-time-picker-end"
          className="wed-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
          style ={formValue.Wednesday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Wednesday ? false : true}
          value={formValue.WednesdayEndTime}
          onChange={handleEndTimeWednesday}
        />

        <input
        aria-label="thursday-checkbox"
          className=" thur-checkbox"
          type="checkbox"
          id="Thursday"
          onChange={handleChangeCheckBox}
        />
        <label className="thur-label">Thursday</label>

        <TimePicker
         aria-label="thursday-time-picker-start"
          className="thur-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          style ={formValue.Thursday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Thursday ? false : true}
          value={formValue.ThursdayStartTime}
          onChange={handleStartTimeThrusday}
        />

        <TimePicker
         aria-label="thursday-time-picker-end"
          className="thur-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
           style ={formValue.Thursday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Thursday ? false : true}
          value={formValue.ThursdayEndTime}
          onChange={handleEndTimeThursday}
        />

        <input
        aria-label="friday-checkbox"
          className="fri-checkbox"
          type="checkbox"
          id="Friday"
          onChange={handleChangeCheckBox}
        />
        <label className="fri-label">Friday</label>

        <TimePicker
         aria-label="friday-time-picker-start"
          className="fri-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
           style ={formValue.Friday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Friday ? false : true}
          value={formValue.FridayStartTime}
          onChange={handleStartTimeFriday}
        />

        <TimePicker
           aria-label="friday-time-picker-end"
          className="fri-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
           style ={formValue.Friday ? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Friday ? false : true}
          value={formValue.FridayEndTime}
          onChange={handleEndTimeFriday}
        />

        <input
        aria-label="saturday-checkbox"
          className=" sat-checkbox"
          type="checkbox"
          id="Saturday"
          onChange={handleChangeCheckBox}
        />
        <label className="sat-label">Saturday</label>

        <TimePicker
         aria-label="saturday-time-picker-start"
          className="sat-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
           style ={formValue.Saturday? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Saturday ? false : true}
          value={formValue.SaturdayStartTime}
          onChange={handleStartTimeSaturday}
        />

        <TimePicker
          aria-label="saturday-time-picker-end"
          className="sat-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
          style ={formValue.Saturday? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Saturday ? false : true}
          value={formValue.SaturdayEndTime}
          onChange={handleEndTimeSaturday}
        />

        <input
         aria-label="sunday-checkbox"
          className=" sun-checkbox"
          type="checkbox"
          id="Sunday"
          onChange={handleChangeCheckBox}
        />
        <label className="sun-label">Sunday</label>

        <TimePicker
         aria-label="sunday-time-picker-start"
          className="sun-start"
          start="0"
          end="24"
          name="StartTime"
          step={30}
          style ={formValue.Sunday? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Sunday ? false : true}
          value={formValue.SundayStartTime}
          onChange={handleStartTimeSunday}
        />

        <TimePicker
        aria-label="sunday-time-picker-end"
          className="sun-end"
          start="0"
          end="24"
          step={30}
          name="EndTime"
          style ={formValue.Sunday? {backgroundColor:"#D0F0C0"}:{}}
          disabled={formValue.Sunday ? false : true}
          value={formValue.SundayEndTime}
          onChange={handleEndTimeSunday}
        />

        <input
         aria-label="image-picker-hiden"
          className="img-picker"
          ref={fileInput}
          type="file"
          name="file"
          onChange={handleFile}
          id="validationFormik107"
          feedbackTooltip
         
        />

        <button 
        aria-label="image-picker"
          className = "img-picker-show"
          onClick={fileUploadTrigerInput}
        >Upload Iamge</button>
        

        <img
         aria-label="image-display"
          className="picture-upload"
          src={temImageFileAfterPicked}
         
         
        />

        <button
         aria-label="submit-post-button"
          type="button"
          className="  submit-btn"
          onClick={createPost}
        >
          CREATE POST
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
