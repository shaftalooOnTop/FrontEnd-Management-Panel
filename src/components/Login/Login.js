import { Form, Input } from 'antd';
import React from 'react';
import qs from "qs";
import axios from 'axios'
import { notification } from 'antd';
import { postUser } from '../../services/axios';

import 'antd/dist/reset.css';
import './Login.css';

export const Login = () => {

    const onFinish = (event) =>{
        //console.log(event)
        let res = qs.stringify({
            'UserName' : event.username,
            'Password' : event.password,
        })
        //console.log(res)
        let config = {
            method: 'post',
            url: '',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : res,
        }
        postUser(res)
            .then(function (response) {
                /*notification.open({
                    message: 'Login was successful.',
                    //description: 'User has been successfuly Logged-In.',
                    type:'success',
                    style: {borderRadius: '5px', backgroundColor: '#fbc403'}
                });*/
                //alert("User has been successfuly signed-up.");
                window.location.replace("/dashboard")
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                notification.open({
                    message: 'Login was NOT successful',
                    //description: error.response.data,
                    type:'error',
                    style: {borderRadius: '5px', backgroundColor: '#fbc403'}
                });
                console.log(error.response.data);
            });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
          >
          <Input className='input' placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          >
          <Input
            className='input'
            type="password"
            placeholder="Password"
            />
        </Form.Item>

        <Form.Item className='a-links'>
          <a className='register-link' href="">register now!</a>
          <a className='forgot-link' href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <button className="submit" placeholder="submit">
            Log in
          </button>
        </Form.Item>
      </Form>
        </div>
    );
}