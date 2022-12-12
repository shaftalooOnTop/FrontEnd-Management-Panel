import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import "./sale-report.css";
import 'bootstrap/dist/css/bootstrap.min.css';


// Wijmo imports
import "wijmo/styles/wijmo.css";
import { FlexGrid, FlexGridColumn } from "wijmo/wijmo.react.grid";
import { FlexChart, FlexPie, FlexChartSeries } from "wijmo/wijmo.react.chart";
import { RadialGauge } from "wijmo/wijmo.react.gauge";


export const Sale_report = () => {
    const current = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const current_day = days[current.getDay()];
    const current_month = monthNames[current.getMonth()];
    const current_year = current.getFullYear();
    return (
        <>
            <div className="sale-report-All">
                <div className="sale-report-cards">
                    <div className="card text-white bg-primary mb-3" style={{ maxWidth: "18rem", minWidth: "18rem" }} >
                        <div className="card-header">Daily Profit</div>
                        <div className="card-body">
                            <h5 className="card-title">{current_day}</h5>
                            <p className="card-text">
                                530,900 Toman
                            </p>
                        </div>
                    </div>
                    
                    <div className="card text-white bg-success mb-3" style={{ maxWidth: "18rem", minWidth: "18rem" }} >
                        <div className="card-header">Monthly Profit</div>
                        <div className="card-body">
                            <h5 className="card-title">{current_month}</h5>
                            <p className="card-text">
                                530,900 Toman
                            </p>
                        </div>
                    </div>
                    <div
                        className="card text-white bg-danger mb-3"
                        style={{ maxWidth: "18rem", minWidth: "18rem" }}
                    >
                        <div className="card-header">Yearly Profit</div>
                        <div className="card-body">
                            <h5 className="card-title">{current_year}</h5>
                            <p className="card-text">
                                530,900 Toman
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};
