import React, { useEffect, useState } from "react";
import { theme, ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

import './poll.css'
import { getPollResult, getUser } from "../../Services/axios";
import { currentResId } from "../../Services/consts";

export const Poll = ()=> {
    const [result, setResult] = useState([])

    useEffect(() => {
      getUser()
    .then((res) => {
        getPollResult(res.data.restaurantId)
        .then((response) => {
            console.log(response.data)
            setResult(response.data)
        })
        .catch((e) => {
            console.log(e)
        })
      })
    }, [])

    const data = [
        {
            type: "service quality",
            sales: result[0],
          },
          {
            type: 'food quality',
            sales: result[1],
          },
          {
            type: 'Personnel Behavior',
            sales: result[2],
          },
          {
            type: 'order accuracy',
            sales: result[3],
          },
          {
            type: 'restaurant atmosphere',
            sales: result[4],
          },
          {
            type: 'find room in parking lot',
            sales: result[5],
          },
          {
            type: 'cleanliness of restaurant',
            sales: result[6],
          },
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: 'rgb(238,186,44)',
        label: {
          position: 'middle',
          // 'top', 'bottom', 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'question',
          },
          sales: {
            alias: 'result',
          },
        }
      };

    const gen = () => {
        if (result.length == 0){
            return <h4>No data</h4>
        }
        else {
            return <Column {...config} />
        }
    }

    return (
        <>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#eeba2c',
                    colorBorder: '#262626',
                },
            }}
            >
            <div className="restaurant-poll-result">
                <div className="inner-restaurant-poll">
                    <div className="restaurant-poll-container">
                        {gen()}
                    </div>
                </div>
            </div>
          </ConfigProvider>
        </>
    )
}