import React, { useEffect, useState } from "react";
import { getRestaurantOrders } from "../../Services/axios";
import { currentResId } from "../../Services/consts";
import { theme, ConfigProvider, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';
import { Order_card } from "./order-card";

import './restaurant-orders.css'

export const Orders = ()=> {

    const dateFormat = 'YYYY-MM-DD';
    const [headName, setHeadName] = useState('Inprogress')
    const [dateOrders, setDateOrders] = useState()


    useEffect(() => {

    }, [headName, dateOrders])

    useEffect(() => {
        setDateOrders(new Date().toJSON().slice(0, 10))
        getRestaurantOrders(currentResId)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {

        })
    }, [])

    const onChangeDate = (date, dateString) => {
        console.log(dateString);
        setDateOrders(dateString)
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
                            <DatePicker size={'large'} defaultValue={dayjs(new Date().toJSON().slice(0, 10), dateFormat)} format={dateFormat} className="date-picker-orders" onChange={onChangeDate} />
                        </div>
                        <div className="orders-filter">
                            <Radio.Group size={'large'} onChange={onChangeTab} defaultValue="Inprogress" buttonStyle="solid">
                                <Radio.Button className="radio-select" value="All">All</Radio.Button>
                                <Radio.Button className="radio-select" value="Inprogress">Inprogress</Radio.Button>
                                <Radio.Button className="radio-select" value="History">History</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="restaurant-orders-container">
                        <div className="title-res-orders-container">
                            <div className="nameee">
                                <h1 className="titlesss">{headName}</h1>
                            </div>
                            <div className="dateee">
                                <h1 className="titlesss">{dateOrders}</h1>
                            </div>
                        </div>
                        <div className="restaurant-orders-list">
                            
                                <Order_card/>
                                {/*<div className="left-order-info">
                                    <h1>test</h1>
                                </div>
                                <div className="right-order-info">
                                    <h1>test</h1>
        </div>*/}
                            
                        </div>
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </>
    )
}