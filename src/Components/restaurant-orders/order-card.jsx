import React, { useState } from "react";
import { Modal, Select  } from 'antd';

import './restaurant-orders.css'
import { getRestaurant } from "../../Services/axios";



export const Order_card = (/*{order}*/) => {

    const res_logo = "https://www.jardi-creation.be/wp-content/uploads/2020/01/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";
/*
    const [res_name, setResName] = useState()
    const [res_logo, setResLogo] = useState()
    const [order_time, setOrderTime] = useState(order.dateCreated)
    const [order_cost, setOrderCost] = useState()
    const [factor, setFactor] = useState(order.foods)
    const [status, setStatus] = useState(order.stat)
*/
    const orderStatus = [{label : "Finished", value : '0'} , {label : "inProcess", value : '1'} , {label : "Accepted", value: '2'} , {label: "Paid", value : '3'}]
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
    }

    return (
        <>
            <div className="order-card">
                <div className="order-card-top">
                    <img className="order-res-logo" src={res_logo} alt="" />
                    <h2 className="order-name-user">{/*res_name*/}name</h2>
                </div>
                <div className="order-time-info">
                    <div className="inner-time-info">
                        <h4 className="order-date"><i class='bx bxs-calendar'></i> {/*order_day*/}date</h4>
                        <h4 className="order-time"><i class='bx bxs-time'></i> {/*order_hour*/}time</h4>
                    </div>
                </div>
                <div className="order-card-bottom">
                    <div className="order-factor-and-status">
                        <Select 
                            defaultValue="set State"
                            style={{
                                textAlign: 'left'
                            }}
                            size={'large'}
                            onChange={handleChangeStatus}
                            options={orderStatus}
                        />
                        <button className="factor-button"  /*onClick={showModal}*/>Factor</button>
                    </div>
                </div>
            </div>
        </>
    )
}