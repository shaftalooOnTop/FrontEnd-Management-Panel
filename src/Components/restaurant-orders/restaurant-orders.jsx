import React, { useEffect, useState } from "react";
import { getRestaurantOrders, getUser } from "../../Services/axios";
import { currentResId } from "../../Services/consts";
import { theme, ConfigProvider, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';
import { Order_card } from "./order-card";

import './restaurant-orders.css'

export const Orders = ()=> {

    const dateFormat = 'YYYY-MM-DD';
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [filterOrders, setFilterOrders] = useState()
    const [orders, setOrders] = useState([])
    const [gen, setGen] = useState(false)

    useEffect(() => {

    }, [, filterOrders])

    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setFrom(dateString[0])
        setTo(dateString[1])
        console.log(from, to)
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };


    const onChangeTab = ({ target: { value } }) => {
        console.log(value)
        setFilterOrders(value)
    }

    const onclickFilter = () => {
        console.log(from + ' ' + to + ' ' + filterOrders)
     /* setOrders() */
        getUser()
        .then((res) => {
            console.log(res.data.restaurantId);
        getRestaurantOrders(from, to, filterOrders, res.data.restaurantId)
        .then((response) => {
            console.log(response.data)
            setOrders(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    })
    }

    const orders_gen = () => {
        const tmp=[]
        orders.forEach(o => {
            console.log(o);
            
            tmp.push(
                <div className="order-card">
                    <Order_card order={o}/>
                </div>
            )
      })
    //   if (tmp.length == 0) {
    //     return (
    //         <div className="nothing">
    //             <label className="label-btnnn">You have not registered an order yet, Go order :</label>
    //             <button 
    //                 className="btn-go-to-res-page"
    //                 /*onClick={() => handlClick()}*/
    //                 >
    //                     restaurants
    //             </button>
    //         </div>
    //     )
    //   }

      return tmp;
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
                                <Radio.Button className="radio-select" value="3">Paid</Radio.Button>
                                <Radio.Button className="radio-select" value="2">Accepted</Radio.Button>
                                <Radio.Button className="radio-select" value="1">Inprogress</Radio.Button>
                                <Radio.Button className="radio-select" value="0">Finished</Radio.Button>
                            </Radio.Group>
                        </div>
                        <button className="factor-button"  onClick={onclickFilter}>Filter</button>
                    </div>
                    <div className="restaurant-orders-container">
                        {orders_gen()}
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </>
    )
}