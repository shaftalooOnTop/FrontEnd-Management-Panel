import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import "./sale-report.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getProfit, getBusiestTime } from "../../Services/axios";

export const Sale_report = () => {
  const current = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const current_day = days[current.getDay()];
  const current_month = monthNames[current.getMonth()];
  const current_year = current.getFullYear();

  const [restId,setRestId] = useState (7);
  const [dailyProfit, setDailyProfit] = useState (0); 
  const [monthlyProfit, setMonthlyProfit] = useState (0); 
  const [yearlyProfit, setYearlyProfit] = useState (0); 
  
  const percentage = 66;

  useEffect(() => {
    getProfit(restId).then (e => {
      setDailyProfit(e.dailyProfit);
      setMonthlyProfit(e.monthlyProfit);
      setYearlyProfit(e.yearlyProfit);
      
    }).catch()
    
  },[]);

  return (
    <>
      <div className="sale-report-All">
        <div className="sale-report-cards">
          <div
            className="card text-white bg-primary mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Daily Profit</div>
            <div className="card-body">
              <h5 className="card-title">{current_day}</h5>
              <p className="card-text">{dailyProfit} Toman</p>
            </div>
          </div>

          <div
            className="card text-white bg-success mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Monthly Profit</div>
            <div className="card-body">
              <h5 className="card-title">{current_month}</h5>
              <p className="card-text">{monthlyProfit} Toman</p>
            </div>
          </div>
          <div
            className="card text-white bg-danger mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Yearly Profit</div>
            <div className="card-body">
              <h5 className="card-title">{current_year}</h5>
              <p className="card-text">{yearlyProfit} Toman</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex',}}>
        <div className="card text-black bg-warning mb-3" style={{ maxWidth: "37rem", minWidth: "37rem" }} >
          <div className="card-header res-busiest-card">
            Restaurant Busiest Times
          </div>
          <div className="card-body clock-body">
            

            <div className="clock-bar" style={{ width: 500, height: 200, }}>
              <div className="clock-item">
                  <CircularProgressbar
                    
                    value={25}
                    text="15:30"
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: "#161616",
                      textColor: "#161616",
                      //   trailColor: 'white',
                    })}
                  />
                  <p className="clock-item-title">Daily</p>
                </div>
                <div className="clock-item">
                  <CircularProgressbar
                    
                    value={25}
                    text="15:30"
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: "#161616",
                      textColor: "#161616",
                      //   trailColor: 'white',
                    })}
                  />
                  <p className="clock-item-title">Weekly</p>
                </div>
                <div className="clock-item">
                  <CircularProgressbar
                    
                    value={25}
                    text="15:30"
                    styles={buildStyles({
                      rotation: 0,
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: "#161616",
                      textColor: "#161616",
                      //   trailColor: 'white',
                    })}
                  />
                  <p className="clock-item-title">Monthly</p>
                </div>
            </div>

          </div>
        </div>
        <div className="card text-white bg-danger mb-3" style={{ maxWidth: "18rem", minWidth: "18rem" }} >
            <div className="card-header">Best Selling Foods</div>
            <div className="card-body">
              <h5 className="card-title">{current_year}</h5>
              <p className="card-text">530,900 Toman</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
