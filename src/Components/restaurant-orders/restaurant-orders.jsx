import React, { useEffect, useState } from "react";
import { getRestaurantOrders } from "../../Services/axios";
import { currentResId } from "../../Services/consts";
import { theme, ConfigProvider, DatePicker, Radio } from 'antd';

import './restaurant-orders.css'

export const Orders = ()=> {

    const [headName, setHeadName] = useState('Inprogress')


    useEffect(() => {

    }, [headName])

    useEffect(() => {
        getRestaurantOrders(currentResId)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {

        })
    }, [])

    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
    }

    const onChangeTab = ({ target: { value } }) => {
        console.log(value)
        setHeadName(value)
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
            <div className="restaurant-orders">
                <div className="inner-restaurant-orders">
                    <div className="selectors">
                        <div className="orders-date">
                            <label className="label-date" htmlFor="">date :</label>
                            <DatePicker className="date-picker-orders" onChange={onChangeDate} />
                        </div>
                        <div className="orders-filter">
                            <Radio.Group onChange={onChangeTab} defaultValue="Inprogress" buttonStyle="solid">
                                <Radio.Button className="radio-select" value="All">All</Radio.Button>
                                <Radio.Button className="radio-select" value="Inprogress">Inprogress</Radio.Button>
                                <Radio.Button className="radio-select" value="History">History</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="restaurant-orders-container">
                        <h1>{headName}</h1>
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </>
    )
}