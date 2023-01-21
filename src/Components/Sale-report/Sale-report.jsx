import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import "./sale-report.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getProfit, getBusiestTime, getFoodSell } from "../../Services/axios";
import { url } from "../../Services/consts";

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

  const [restId, setRestId] = useState(2);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [yearlyProfit, setYearlyProfit] = useState(0);

  const [dailyBusiestTime, setDailyBusiestTime] = useState(12);
  const [weeklyBusiestTime, setWeeklyBusiestTime] = useState(12);
  const [monthlyBusiestTime, setMonthlyBusiestTime] = useState(12);

  const [foods, setFoods] = useState();

  useEffect(() => {
    getProfit(restId)
      .then((e) => {
        setDailyProfit(e.data.dailyProfit);
        setMonthlyProfit(e.data.monthlyProfit);
        setYearlyProfit(e.data.yearlyProfit);
      })
      .catch();

    getBusiestTime(restId)
      .then((e) => {
        setDailyBusiestTime(e.data.dayHour.length > 0 ? e.data.dayHour[0] : 0);
        setWeeklyBusiestTime(
          e.data.weekHour.length > 0 ? e.data.weekHour[0] : 0
        );
        setMonthlyBusiestTime(
          e.data.monthHour.length > 0 ? e.data.monthHour[0] : 0
        );
      })
      .catch();

    getFoodSell(restId)
      .then((e) => {
        // console.log("Hello");
        // console.log(e.key);
        setFoods(e.data);
      })
      .catch();
  }, []);

  return (
    <>
      <div className="report-all">
        <div className="reportAll">
          <div className="sale-report-cards">
            <div
              className="card text-white  mb-3"
              style={{
                maxWidth: "33%",
                minWidth: "33%",
                backgroundColor: "#2A6877",
              }}
            >
              <div className="card-header">Daily Profit</div>
              <div className="card-body">
                <h5 className="card-title">{current_day}</h5>
                <p className="card-text">{dailyProfit} Toman</p>
              </div>
            </div>

            <div
              className="card text-white  mb-3"
              style={{
                maxWidth: "30%",
                minWidth: "30%",
                backgroundColor: "#406B58",
              }}
            >
              <div className="card-header">Monthly Profit</div>
              <div className="card-body">
                <h5 className="card-title">{current_month}</h5>
                <p className="card-text">{monthlyProfit} Toman</p>
              </div>
            </div>
            <div
              className="card text-white mb-3"
              style={{
                maxWidth: "30%",
                minWidth: "30%",
                backgroundColor: "#B92B27",
              }}
            >
              <div className="card-header">Yearly Profit</div>
              <div className="card-body">
                <h5 className="card-title">{current_year}</h5>
                <p className="card-text">{yearlyProfit} Toman</p>
              </div>
            </div>
            
          </div>
          <div className="restBusi" style={{ display: "flex" }}>
            <div className="card text-black bg-warning mb-3 restBusi2">
              <div className="card-header res-busiest-card">
                Restaurant Busiest Times
              </div>
              <div className="card-body clock-body">
                <div className="clock-bar">
                  <div className="clock-item">
                    <CircularProgressbar
                      value={
                        ((dailyBusiestTime > 12
                          ? dailyBusiestTime - 12
                          : dailyBusiestTime) /
                          12) *
                        100
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
                        ((weeklyBusiestTime > 12
                          ? weeklyBusiestTime - 12
                          : weeklyBusiestTime) /
                          12) *
                        100
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
                        ((monthlyBusiestTime > 12
                          ? monthlyBusiestTime - 12
                          : monthlyBusiestTime) /
                          12) *
                        100
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
              className="card text-white mb-3"
              style={{
                maxWidth: "30%",
                minWidth: "30%",
                backgroundColor: "#F76704",
              }}
            >
              <div className="card-header">Best Selling Foods</div>
              <div className="card-body">
                {foods?.slice(0, 3).map((x) => (
                  <div className="best-selling-all">
                    <img
                      className="best-selling-img"
                      src={url + "api/www/ImgGet/" + x.key.photo.id}
                      alt=""
                    ></img>
                    <div className="best-selling-details">
                      <h6 className="card-text">{x.key.name}</h6>
                      <p>Sales amount: {x.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
              className="card text-white  mb-5"
              style={{
                maxWidth: "20%",
                minWidth: "20%",
                backgroundColor: "#37505E",
              }}
            >
              <div className="card-header">Rank Tables</div>
              <div className="card-body">
                <h5 className="card-title">First Tables</h5>
                <p className="card-text">Test</p>
              </div>
        </div>
      </div>
    </>
  );
};
