import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


const Calendar = (props) => {

 const busHr  = [];


  //todo update businessHr in useState

  const checkBusinessHr = (driveWayPost) => {
    
    for (let [key, value] of Object.entries(driveWayPost)) {
      if (key === "Monday" && value === true) {
        busHr.push({
          daysOfWeek: [1],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.MondayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.MondayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Tuesday" && value === true) {
        busHr.push({
          daysOfWeek: [2],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.TuesdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.TuesdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Wednesday" && value === true) {
        busHr.push({
          daysOfWeek: [3],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.WednesdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.WednesdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Thursday" && value === true) {
        busHr.push({
          daysOfWeek: [4],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.ThursdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.ThursdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Friday" && value === true) {
        busHr.push({
          daysOfWeek: [5],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.FridayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.FridayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Saturday" && value === true) {
        busHr.push({
          daysOfWeek: [6],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SaturdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SaturdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Sunday" && value === true) {
        busHr.push({
          daysOfWeek: [7],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SundayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SundayEndTime)
            .format("H:mm"),
        });
      }
    }
  };

  checkBusinessHr(props.selectedPost);

  const getEvent=()=>{

    const events=[];
    for(let event of props.appointment){
     events.push( {title:event.renter, start: new Date(event.start), end:new Date(event.end)})
     console.log(events)

    }

    return events;
  }

  





  return (
    <FullCalendar
      style ={props.style}
      className=""
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      defaultDate={new Date()}
      selectable={true}
      displayEventTime={false}
      events={getEvent()}
      eventColor="#c87606 "
      defaultView="timeGridWeek"
      header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      }}
      businessHours={busHr}
      
     
    />
  );
};

export default Calendar;
