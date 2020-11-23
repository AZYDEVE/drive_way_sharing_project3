import React from "react";
import"./card.css"

function CardView(props){

   return (
      <div className="card text-center entireCard" style = {props.style}>
        <div className="overflow">
          <img
            className="cardview-image"
            src={props.picture}
            alt="img1"
          
            
          />
        </div>
        <div className="card-body text-dark" style={{border:"1px", borderRadius: "40px !important"}} >
          <h4 className="card-title">{`Fee: ${props.parkingFee}`}</h4>
          <p className ="card-description2"></p>
          <p className="card-description">{props.street}</p>
          <button className="card-button" name={props.name} onClick={()=> {props.function(props.post)}} >
            {props.buttonName}
          </button>
        </div>
      </div>
    );
}

export default CardView;