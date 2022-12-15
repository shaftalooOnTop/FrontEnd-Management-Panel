import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import "./sale-report.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Wijmo imports
import "wijmo/styles/wijmo.css";
import { FlexGrid, FlexGridColumn } from "wijmo/wijmo.react.grid";
import { FlexChart, FlexPie, FlexChartSeries } from "wijmo/wijmo.react.chart";
import { RadialGauge } from "wijmo/wijmo.react.gauge";

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

  const percentage = 66;

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
              <p className="card-text">530,900 Toman</p>
            </div>
          </div>

          <div
            className="card text-white bg-success mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Monthly Profit</div>
            <div className="card-body">
              <h5 className="card-title">{current_month}</h5>
              <p className="card-text">530,900 Toman</p>
            </div>
          </div>
          <div
            className="card text-white bg-danger mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem" }}
          >
            <div className="card-header">Yearly Profit</div>
            <div className="card-body">
              <h5 className="card-title">{current_year}</h5>
              <p className="card-text">530,900 Toman</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex',}}>
        <div className="card text-black bg-warning mb-3" style={{ maxWidth: "37rem", minWidth: "37rem" }} >
          <div className="card-header res-busiest-card">
            Restaurant Busiest Times
          </div>
          <div className="card-body">
            <div className="res-busiest-card">
              <button type="button" class="btn btn-primary">
                Daily
              </button>
              <button type="button" class="btn btn-success">
                Monthly\order
              </button>
              <button type="button" class="btn btn-danger">
                Yearly
              </button>
            </div>

            <div className="clock-bar">
              <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar
                  value={25}
                  text="15:30"
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: "#161616",
                    textColor: "#161616",
                    //   trailColor: 'white',
                  })}
                />
              </div>
              <div className="busiest-date">
                <p>Thursday</p>
                <p>December 15</p>
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
