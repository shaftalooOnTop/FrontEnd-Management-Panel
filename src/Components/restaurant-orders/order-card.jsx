import React, { useEffect, useState } from "react";
import { Modal, Select  } from 'antd';

import './restaurant-orders.css'
import { getRestaurant } from "../../Services/axios";



export const Order_card = ({order}) => {

    const user_logo = "https://www.jardi-creation.be/wp-content/uploads/2020/01/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";
    const orderStatus = [{label : "Finished", value : '0'} , {label : "inProcess", value : '1'} , {label : "Accepted", value: '2'} , {label: "Paid", value : '3'}]
    const [user_name, setResName] = useState('name')
    /*const [user_logo, setResLogo] = useState()*/
    const [order_day, setOrderDay] = useState(order.dateCreated)
    const [order_hour, setOrderHour] = useState()
    const [order_cost, setOrderCost] = useState()
    const [factor, setFactor] = useState(order.foods)
    const [status, setStatus] = useState(orderStatus[order.stat])

    useEffect(() => {
        console.log('here')
        let t = order.dateCreated;
        let date = new Date(t).toJSON()
        let day = date.split('T')[0]
        let hour = date.split('T')[1].slice(0,5)
        setOrderDay(day)
        setOrderHour(hour)
    }, [])
 /*   
    getRestaurant(order.restaurantId)
    .then((res) => {
        setResLogo(res.data.logoImg)
        setResName(res.data.name)
    })
    .catch((e) => {
        console.log(e)
    })
    /*** factor modal ***
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        console.log('dadfasdfasdfasdfasdfasdf')
      setVisible(true)
    };

    const handleOk = e => {
      console.log(e);
      setVisible(false)
    };

    const handleCancel = e => {
      console.log(e);
      setVisible(false)
    };*/

    const handleChangeStatus = (value)=> {
        console.log(`selected ${value}`);
        setStatus(orderStatus[value])
    }

    return (
        <>
            <div className="order-card-inner">
                <div className="order-card-top">
                    <img className="order-res-logo" src={user_logo} alt="" />
                    <h2 className="order-name-user">{user_name}</h2>
                </div>
                <div className="order-time-info">
                    <div className="inner-time-info">
                        <h6 className="order-date"><i class='bx bxs-calendar'></i> {order_day}</h6>
                        <h6 className="order-time"><i class='bx bxs-time'></i> {order_hour}</h6>
                    </div>
                </div>
                <div className="order-card-bottom">
                    <div className="order-factor-and-status">
                        <Select 
                            defaultValue="set State"
                            style={{
                                textAlign: 'left',  
                                width: '200px'                        
                            }}
                            size={'large'}
                            onChange={handleChangeStatus}
                            options={orderStatus}
                            value={status}
                        />
                        <button className="factor-button"  /*onClick={showModal}*/>Factor</button>
                    </div>
                </div>
            </div>
        </>
    )
}