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
    const orderStatus = ["Finished" , "inProcess" , "Accepted" , "Paid"]
    
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
                <div className="order-card-left">
                    <div className="order-res-info">
                        <img className="order-res-logo" src={res_logo} alt="" />
                        <div className="order-res-name-and-time">
                            <h2 className="order">{/*res_name*/}Name</h2>
                            <div className="order-time">
                                <h3 className="order">{/* Date(order_time) */}sent : 2022-12-28 19:22</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card-right">
                    {/* <div className="order-cost">
                        <h2 className="order">Order cost : {order_cost}</h2>
                    </div> */}
                    <div className="order-factor-and-status">
                        {/*<button className="status-button">{/*orderStatus[status]}status</button>*/}
                        <Select defaultValue="jack"
                            style={{
                                width: '30%',
                                textAlign: 'left'
                            }}
                            size={'large'}
                            onChange={handleChangeStatus}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                            ]}
                        />
                        <button className="factor-button"  /*onClick={showModal}*/>Factor</button>
                        {/** factor modal
                        <Modal
                          title="Basic Modal"
                          open={visible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                        </Modal>*/}
                    </div>
                </div>
            </div>
        </>
    )
}