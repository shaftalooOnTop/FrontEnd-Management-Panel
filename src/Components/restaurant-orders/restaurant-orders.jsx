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

    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };


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
                            <label className="label-date" htmlFor=""><i class='bx bxs-calendar-event'></i>date :</label>
                            <RangePicker
                                size={'large'}
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                                onOk={onOk}
                            />
                        </div>
                        <div className="orders-filter">
                            <Radio.Group size={'large'} onChange={onChangeTab} defaultValue="Paid" buttonStyle="solid">
                                <Radio.Button className="radio-select" value="Paid">Paid</Radio.Button>
                                <Radio.Button className="radio-select" value="Inprogress">Inprogress</Radio.Button>
                                <Radio.Button className="radio-select" value="History">Finished</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="restaurant-orders-container">
                        <Order_card/>
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </>
    )
}