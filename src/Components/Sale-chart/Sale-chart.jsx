import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import {
  getDailySaleChart,
  getWeeklySaleChart,
  getMonthlySaleChart,
} from "../../Services/axios";
import { useEffect, useRef, useState } from "react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Sale_chart = () => {
  const [dailySaleChart, setDailySaleChart] = useState([]);
  const [weeklySaleChart, setWeeklySaleChart] = useState([]);
  const [monthlySaleChart, setMonthlySaleChart] = useState([]);
  const [restId, setRestId] = useState(2);

  const optionsDay = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Daily Sale Chart",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: dailySaleChart,
      },
    ],
  };

  const optionsWeek = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Weekly Sale Chart",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: weeklySaleChart,
      },
    ],
  };
  const optionsMonth = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Mothly Sale Chart",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: monthlySaleChart,
      },
    ],
  };
  useEffect(() => {
    getDailySaleChart(restId)
      .then((e) => {
        const t = e.data;
        const tmp = t.map((d) => {
          return {
            y: d.sellNubmer,
            indexLabel: d.foodName,
          };
        });
        setDailySaleChart(tmp);
      })
    .catch();

    getWeeklySaleChart(restId)
      .then((e) => {
        const t = e.data;
        const tmp = t.map((d) => {
          return {
            y: d.sellNubmer,
            indexLabel: d.foodName,
          };
        });
        setWeeklySaleChart(tmp);
      })
      .catch();

    getMonthlySaleChart(restId)
      .then((e) => {
        const t2 = e.data;
        const tmp2 = t2.map((d) => {
          return {
            y: d.sellNubmer,
            indexLabel: d.foodName,
          };
        });
        setMonthlySaleChart(tmp2);
      })
      .catch();
  }, []);

  return (
    <div>
      <CanvasJSChart options={optionsDay} />
      <CanvasJSChart options={optionsWeek} />
      <CanvasJSChart options={optionsMonth} />
    </div>
  );
};
