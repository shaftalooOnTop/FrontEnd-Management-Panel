import React, { useEffect, useState } from "react";
import { theme, ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

import './poll.css'
import { getPollResult } from "../../Services/axios";
import { currentResId } from "../../Services/consts";

export const Poll = ()=> {
    const [result, setResult] = useState()

    useEffect(() => {
        getPollResult(currentResId)
        .then((response) => {
            console.log(response.data)
            setResult(response.data)
        })
        .catch((e) => {
            console.log(e)
        })
    }, [])

    const data = [
        {
            type: "service quality",
            value: result[0],
          },
          {
            type: 'food quality',
            value: result[1],
          },
          {
            type: 'Personnel Behavior',
            value: result[2],
          },
          {
            type: 'order accuracy',
            value: result[3],
          },
          {
            type: 'restaurant atmosphere',
            value: result[4],
          },
          {
            type: 'find room in parking lot',
            value: result[5],
          },
          {
            type: 'cleanliness of restaurant',
            value: result[6],
          },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };

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
                        <Pie {...config} />
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </>
    )
}