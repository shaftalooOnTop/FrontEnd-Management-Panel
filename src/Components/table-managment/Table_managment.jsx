import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
    Modal,
    AutoComplete,
    Tag,
    Tooltip,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    message,
    InputNumber,
    Row,
    Select,
    Upload,
  } from 'antd';

import './table-managment.css'
import 'antd/dist/reset.css';

export const Table_managment = () => {

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const showModal_add = () => {
        setIsAddModalOpen(true);
    };

    const showModal_rem = () => {
        setIsRemoveModalOpen(true);
    };

    const handleOk_add = () => {
        setIsAddModalOpen(false);
    };

    const handleOk_rem = () => {
      setIsRemoveModalOpen(false);
  };


    const handleCancel = () => {
        setIsAddModalOpen(false);
        setIsRemoveModalOpen(false);
    };

    const onChange = (value) => {
        console.log('changed', value);
      };

      const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };


  const add_table_gen = () => {

    return (
      <Modal className="modal" title="Add table" open={isAddModalOpen} onCancel={handleCancel} 
        footer={

          <Form.Item>
            <button className='enter-button-add' htmlType="submit" onClick={handleOk_add}>
              Enter
            </button>
          </Form.Item>}>
          
          <Form className='form'
            layout='horizontal'
            size='large'
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            >
            
            <div className="div-form-items-add">
            <Form.Item 
              name="number"
              label="table number"
              rules={[
                {
                  required: true,
                  message: 'Please input table number!',
                },
              ]}
            >
              <InputNumber className="input" min={1} max={20} defaultValue={0} onChange={onChange} />
            </Form.Item>

            <Form.Item 
              name="capacity"
              label="capacity"
              rules={[
                {
                  required: true,
                  message: 'Please input table capacity!',
                },
              ]}
              >
              <InputNumber className="input" min={1} max={10} defaultValue={0} onChange={onChange} />
            </Form.Item>
            </div>

          </Form>
      </Modal>
    );
  }

  const remove_table_gen = () => {

    return (
      <Modal className="modal" title="remove table" open={isRemoveModalOpen} onCancel={handleCancel} 
        footer={

          <Form.Item>
            <button className='enter-button-remove' htmlType="submit" onClick={handleOk_rem}>
              Enter
            </button>
          </Form.Item>}
          >
          <div>
          <Form className='form'
            layout='horizontal'
            size='large'
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            >

            <Form.Item className="form-item"
              name="number"
              label="table number"
              rules={[
                {
                  required: true,
                  message: 'Please input table number!',
                },
              ]}
            >
              <InputNumber className="input" min={1} max={20} defaultValue={0} onChange={onChange} />
            </Form.Item>
          </Form>
          </div>
          
      </Modal>
    );
  }

    return (
        <div className="table-managment">
            <div className="table-list">
                <button className="add" onClick={showModal_add}>add</button>
                <button className="remove" onClick={showModal_rem}>remove</button>
                {add_table_gen()}
                {remove_table_gen()}
            </div>
        </div>
    )
}