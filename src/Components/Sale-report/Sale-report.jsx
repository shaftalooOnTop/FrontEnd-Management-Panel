import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import "./sale-report.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getProfit, getBusiestTime, getRestaurantFood } from "../../Services/axios";

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

  const [restId, setRestId] = useState(8);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [yearlyProfit, setYearlyProfit] = useState(0);

  const [dailyBusiestTime, setDailyBusiestTime] = useState(12);
  const [weeklyBusiestTime, setWeeklyBusiestTime] = useState(12);
  const [monthlyBusiestTime, setMonthlyBusiestTime] = useState(12);
  const percentage = 66;

  useEffect(() => {
    getProfit(restId)
      .then((e) => {
        console.log(e.data.monthlyProfit);
        setDailyProfit(e.data.dailyProfit);
        setMonthlyProfit(e.data.monthlyProfit);
        setYearlyProfit(e.data.yearlyProfit);
      })
      .catch();

    getBusiestTime(restId)
      .then((e) => {
        setDailyBusiestTime(e.data.dayHour.length > 0 ? e.data.dayHour : 0);
        setWeeklyBusiestTime(e.data.weekHour.length > 0 ? e.data.weekHour : 0);
        setMonthlyBusiestTime(
          e.data.monthHour.length > 0 ? e.data.monthHour : 0
        );
      })
      .catch();
  }, []);

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
        <div style={{ display: "flex" }}>
          <div
            className="card text-black bg-warning mb-3"
            style={{ maxWidth: "37rem", minWidth: "37rem" }}
          >
            <div className="card-header res-busiest-card">
              Restaurant Busiest Times
            </div>
            <div className="card-body clock-body">
              <div className="clock-bar" style={{ width: 500, height: 200 }}>
                <div className="clock-item">
                  <CircularProgressbar
                    value={
                      (dailyBusiestTime > 12
                        ? dailyBusiestTime - 12
                        : dailyBusiestTime > 12) / 12 * 100
                    }
                    text={dailyBusiestTime}
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
                    value={
                      (weeklyBusiestTime > 12
                        ? weeklyBusiestTime - 12
                        : weeklyBusiestTime > 12) / 12 * 100
                    }
                    text={weeklyBusiestTime}
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
                    value={
                      (monthlyBusiestTime > 12
                        ? monthlyBusiestTime - 12
                        : monthlyBusiestTime > 12) / 12 * 100
                    }
                    text={monthlyBusiestTime}
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
          <div
            className="card text-white bg-danger mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Best Selling Foods</div>
            <div className="card-body">
              <div className="best-selling-all">
                <img className="best-selling-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5okG0tz2dWr36k2p9gxbFmqoM4AeW1e3pPQ&usqp=CAU" alt=""></img>  
                <div className="best-selling-details">
                  <h6 className="card-text">Chicken</h6>
                  <p>Details: Delicious</p>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
