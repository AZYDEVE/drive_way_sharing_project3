import React from "react";
import { useState, useEffect } from "react";
import { Container, Form, Col,option  } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";


function CreatePost() {

  const history = useHistory();

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


const [userInfo, setUserInfo] = useState();



const [formValue, setFormValue] = useState({
  email:"",
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
  MondayStartTime:"",
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
  userId:"123"
  
});

const [imagefile, setImgFile]=useState("");




  const handleChanges = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  
 const stateAbbreviations = ['Alabama','Alaska','American Samoa','Arizona',
 'Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia',
 'Florida','Georgia','Guam','Hawaii','Idaho','Illinois',
 'Indiana','Iowa','Kansas','Kentucky','Louisiana',
 'Maine','Marshall Islands','Maryland','Massachusetts',
 'Michigan','Minnesota','Mississippi','Missouri','Montana',
 'Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
 'New York','North Carolina','North Dakota','Northern Mariana Islands',
 'Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island',
 'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island',
 'Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const handleChangeCheckBox = (event) => {
  setFormValue({
    ...formValue,
    [event.target.id]: event.target.checked,
  });

  console.log(formValue.monday);
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

const handleFile = (event) => {
  console.log(event);
  setImgFile(event.target.files[0]);
};

const createPost = () => {
  console.log(imagefile);
  console.log(formValue);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValue),
  };
  fetch("/insert_newpost", requestOptions)
    .then(async (response) => {
      swal("SUCCESS", "You post is successfully published  ", "success");
      const data = await response.json();

    })
    .catch((error) => {
      console.log(error);
    });

    history.push("/home")
};

/*useEffect(()=>{
  fetch("/get_data", {method:"get"} )
  .then(async(response)=>{
    console.log(JSON.parse(response));

  })
  .catch((error)=>{console.log(error)})},[]
  
)*/
      



return (
  <div>
    <Container>
      <br />
      <h4>Please Enter Drive Way Address</h4>
      <Form>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="street"
            value={formValue.street}
            onChange={handleChanges}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="New York"
              name="city"
              value={formValue.city}
              onChange={handleChanges}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
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

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              name="zip"
              value={formValue.zip}
              onChange={handleChanges}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-sm-4 " controlId="formGridAddress1">
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

      <br />

      <Container className="row">
        <h5>Set Day and Time For Renting Out Your Drive Way</h5>
        <br />
        <div className="col-sm-8">
          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Monday"
                onChange={handleChangeCheckBox}
              />
              <label>Monday</label>
            </div>

            <div as={Col} className="col-sm-3">
              <h6 className="d-flex justify-content-center">Start </h6>
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Monday ? false : true}
                value={formValue.MondayStartTime}
                onChange={handleStartTimeMonday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <h6 className="d-flex justify-content-center">End</h6>
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Monday ? false : true}
                value={formValue.MondayEndTime}
                onChange={handleEndTimeMonday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Tuesday"
                onChange={handleChangeCheckBox}
              />
              <label>Tuesday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Tuesday ? false : true}
                value={formValue.TuesdayStartTime}
                onChange={handleStartTimeTuesday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Tuesday ? false : true}
                value={formValue.TuesdayEndTime}
                onChange={handleEndTimeTuesday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Wednesday"
                onChange={handleChangeCheckBox}
              />
              <label>Wednesday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Wednesday ? false : true}
                value={formValue.WednesdayStartTime}
                onChange={handleStartTimeWednesday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Wednesday ? false : true}
                value={formValue.WednesdayEndTime}
                onChange={handleEndTimeWednesday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Thursday"
                onChange={handleChangeCheckBox}
              />
              <label>Thursday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Thursday ? false : true}
                value={formValue.ThursdayStartTime}
                onChange={handleStartTimeThrusday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Thursday ? false : true}
                value={formValue.ThursdayEndTime}
                onChange={handleEndTimeThursday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Friday"
                onChange={handleChangeCheckBox}
              />
              <label>Friday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Friday ? false : true}
                value={formValue.FridayStartTime}
                onChange={handleStartTimeFriday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Friday ? false : true}
                value={formValue.FridayEndTime}
                onChange={handleEndTimeFriday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Saturday"
                onChange={handleChangeCheckBox}
              />
              <label>Saturday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Saturday ? false : true}
                value={formValue.SaturdayStartTime}
                onChange={handleStartTimeSaturday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Saturday ? false : true}
                value={formValue.SaturdayEndTime}
                onChange={handleEndTimeSaturday}
              />
            </div>
          </Form.Row>

          <Form.Row>
            <div as={Col} className="col-sm-2 align-self-center">
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                id="Sunday"
                onChange={handleChangeCheckBox}
              />
              <label>Sunday</label>
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                name="StartTime"
                step={30}
                disabled={formValue.Sunday ? false : true}
                value={formValue.SundayStartTime}
                onChange={handleStartTimeSunday}
              />
            </div>
            <div as={Col} className="col-sm-3">
              <br />
              <TimePicker
                start="0"
                end="24"
                step={30}
                name="EndTime"
                disabled={formValue.Sunday ? false : true}
                value={formValue.SundayEndTime}
                onChange={handleEndTimeSunday}
              />
            </div>
          </Form.Row>
        </div>
        <div className="col-sm-4">
          <div>
            <Form.File
              required
              name="file"
              label="Upload Drive Way Picture"
              onChange={handleFile}
              id="validationFormik107"
              feedbackTooltip
            />
          </div>
        </div>
      </Container>
      <br />
      <div>
      <button  type="button" className="btn btn-dark  btn-block"  onClick={createPost}>
        Create Post
      </button>
      </div>
    </Container>
  </div>
);
}

export default CreatePost;








