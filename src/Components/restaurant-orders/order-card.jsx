import React, { useEffect, useState } from "react";
import { Modal, Select, TimePicker } from 'antd';

import './restaurant-orders.css'
import { getRestaurant, setDelivaryTime, setStetusOrder, setToFinishOrder } from "../../Services/axios";



export const Order_card = ({order}) => {

    const format = 'HH:mm';
    const user_logo = "https://www.jardi-creation.be/wp-content/uploads/2020/01/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";
    const [dis0, setDis0] = useState(false)
    const [dis1, setDis1] = useState(false)
    const [dis2, setDis2] = useState(false)
    const [dis3, setDis3] = useState(false)
    const orderStatus = [{label : "Finished", disabled : dis0, value : '0', colorrr : 'green'} ,
                         {label : "inProcess", disabled : dis1, value : '1', colorrr : 'black'} ,
                         {label : "Accepted", disabled : dis2, value : '2', colorrr : 'black'} , 
                         {label : "Paid", disabled : dis3, value : '3', colorrr : 'red'}]
    const [user_name, setResName] = useState('name')
    const [id, setID] = useState(order.id)
 /* const [user_logo, setResLogo] = useState() */
    const [order_day, setOrderDay] = useState(order.dateCreated)
    const [order_hour, setOrderHour] = useState()
    const [order_cost, setOrderCost] = useState()
    const [factor, setFactor] = useState(order.foods)
    const [status, setStatus] = useState(order.stat)
    const [delivary, setDelivery] = useState(order.delivary === null ? 'null' : order.delivary)

    useEffect(() => {
        console.log('here')
        let t = order.dateCreated;
        let date = new Date(t).toJSON()
        let day = date.split('T')[0]
        let hour = date.split('T')[1].slice(0,5)
        setOrderDay(day)
        setOrderHour(hour)

/*        if (order.stat === 0){
            setDis1(true)
            setDis2(true)
            setDis3(true)
        }
        if (order.stat === 1){
            setDis2(true)
            setDis3(true)
        }
        if (order.stat === 2){
            setDis3(true)
        }
*/
    }, [])

    useEffect(() => {

    }, [status])

    const daliveryChange = (time, dateString) => {
        console.log(time, dateString)
        
    }

    const handleChangeStatus = (value)=> {
        console.log(`selected ${value}`);
        console.log(order.id + ' ' + value)
        
        if(value == 0){
            setToFinishOrder(order.id)
            .then((respons) => {
                console.log(respons.data)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        else {
            setStetusOrder(value, order.id)
            .then((respons) => {
                console.log(respons.date)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        
        setStatus(orderStatus[value].value)
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
                        <h6 className="order-date"><i class='bx bxs-credit-card'></i> {id}</h6>
                        <h6 className="order-date"><i class='bx bxs-calendar'></i> {order_day}</h6>
                        <h6 className="order-time"><i class='bx bxs-time'></i> {order_hour}</h6>
                        <h6 className="order-time"><i class='bx bxs-hourglass-bottom' ></i> {delivary}</h6>
                    </div>
                </div>
                <div className="order-card-bottom">
                    <div className="order-factor-and-status">
                        <Select 
                            defaultValue="set State"
                            style={{
                                textAlign: 'left',  
                                width: '100px'                        
                            }}
                            size={'large'}
                            onChange={handleChangeStatus}
                            options={orderStatus}
                            value={orderStatus[status].label}
                        />
                        <TimePicker onChange={daliveryChange} /*defaultValue={dayjs('12:08', format)}*/ format={format} />
                        <button style={{backgroundColor: orderStatus[status].colorrr}} className="status-button"><i class='bx bx-task' ></i> {orderStatus[status].label}</button>
                        <button className="factor-button"  /*onClick={showModal}*/><i class='bx bxs-receipt' ></i> order</button>
                    </div>
                </div>
            </div>
        </>
    )
}