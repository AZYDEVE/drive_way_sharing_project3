import React from "react";
import "./css/CardFormyAppointment.css"


function myAppointmentCardView(props){

   return (
      <div className="entireCard-appointment" >
     
          <img
            className="cardview-image-appointment"
            src={props.picture}
            alt="img1"
          />
       
       
          <p className="appointment-address">{`Street:  ${props.street}, ${props.city}, ${props.state}, ${props.zip}`}</p>
          <p className="start-time-appointment">{`Start Time: ${new Date (props.start).toLocaleString("en-US")}`}</p>
          <p className ="end-time-appointment">{`End Time: ${new Date (props.end).toLocaleString("en-US")}`}</p>
        
      </div>
    );
}

export default myAppointmentCardView;