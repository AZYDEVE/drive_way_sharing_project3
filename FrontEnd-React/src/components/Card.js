import React from "react";


function CardView(props){

   return (
      <div className="card text-center" style = {props.style}>
        <div className="overflow">
          <img
            src="https://p.rdcpix.com/v01/l0511a742-m1xd-w640_h480_q80.jpg"
            alt="img1"
            className="card-img-top embed-responsive-item"
          />
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">{`Fee: ${props.parkingFee}`}</h4>
          <p className="card-text text-secondary">{props.street}</p>
          <button className="btn btn-dark" name={props.name} onClick={()=> {props.function(props.post)}} >
            {props.buttonName}
          </button>
        </div>
      </div>
    );
}

export default CardView;