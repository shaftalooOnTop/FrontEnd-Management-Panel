import { Form, Input } from 'antd';
import React from 'react';

import { notification } from 'antd';
import { getbearer, S } from '../../Services/axios';
import {useNavigate} from "react-router-dom";
import 'antd/dist/reset.css';
import './Login.css';

export const Login = () => {

    const onFinish = (event) =>{
        console.log(event)

        getbearer({
          "email": event.email,
          "password": event.password
      }).then((response)=>{
        console.log(response)
        S("token",response.data.token)
        navigate('/');
      })
      .catch(function (error) {
        notification.open({
          message: 'Login was NOT successful',
          //description: error.response.data,
          type:'error',
          style: {borderRadius: '5px', backgroundColor: '#fbc403'}
        });
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const navigate = useNavigate();

    return (
        <div className='login-div'>
      <Form
        name="normal_login"
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <h1 className='welcome'>WELCOME</h1>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          >
          <Input 
            type='email' 
            className='input' 
            placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          >
          <Input
            className='input'
            type="password"
            placeholder="********"
            />
        </Form.Item>

        <Form.Item className='a-links'>
          <a className='register-link' href="">register now!</a>
          <a className='forgot-link' href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <button className='button-add' htmlType="submit">
            Submit
          </button>
        </Form.Item>
      </Form>
        </div>
    );
}