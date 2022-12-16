import React from "react";
import { useEffect , useState } from "react";
import { getTableRestaurant } from "../../services/axios";
import { addTable , deleteTable } from "../../services/axios";

import {
    notification,
    Modal,
    Form,
    InputNumber,
  } from 'antd';

import './table-managment.css'
import 'antd/dist/reset.css';

const TableFormAdd = ({ open, onCreate, onCancel}) => {
  //console.log(open)
  const onChange = (value) => {
    console.log('changed', value);
  };
  const [form] = Form.useForm();

return (
  <Modal className="modal" title="Add table" open={open} onCancel={onCancel}
    onOk={() => {
      form.validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log(info)
      })
    }} 
    >
      
      <Form className='form'
        name="add_table"
        layout='horizontal'
        size='large'
        form={form}
        scrollToFirstError
        >
        
        <div className="div-form-items-add">
        <Form.Item 
          name="number"
          label="table number"
          rules={[
            {
              required: true,
              message: 'Please input table number!'
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
              message: 'Please input table capacity!'
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

const TableFormRemove = ({ open, onCreate, onCancel}) => {
  //console.log(open)
  const onChange = (value) => {
    console.log('changed', value);
  };
  const [form] = Form.useForm();

  return (
    <Modal className="modal" title="remove table" open={open} onCancel={onCancel}
    onOk={() => {
      form.validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log(info)
      })
    }} 
        >
        <div>
        <Form className='form'
          layout='horizontal'
          size='large'
          form={form}
          name="remove_table"
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

export const Table_managment = () => {
  const id = 1;

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tables, setTables] = useState()

  useEffect(() => {
    getTableRestaurant(id)
    .then((response)=>{
      console.log("all of tables : ", response.data)
      setTables(response.data)
      console.log('tables list : ',tables)
    })
  .catch(function (error) {
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
  }, [])

    const showModal_add = () => {
      setIsAddModalOpen(true);
  };

    const showModal_rem = () => {
        setIsRemoveModalOpen(true);
    };

    const handleCancel = () => {
        setIsAddModalOpen(false);
        setIsRemoveModalOpen(false);
    };

    const onCreateTable = (values) => {
      console.log('Received values of form: ', values);

      const data = ({
        'restaurantId' : id,
        'number' : values.number,
        'capacity' : values.capacity
      })

      addTable(data)
      .then((response) => {
        console.log(response)
        notification.open({
          message: 'successful',
          //description: error.response.data,
          type:'success',
          style: {borderRadius: '5px', backgroundColor: '#fbc403'}
        });
        setIsAddModalOpen(false);
      })
      .catch(function (error) {
        notification.open({
          message: 'Unsuccessful!',
          description: error.response.data,
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

      setIsAddModalOpen(false)
    };


    const [id_table, setIdTable]= useState(-1)
    const [flag, setFlag] = useState(false)

    const onRemoveTable = (values) => {
      console.log('Received values of form: ', values);
      const tmp=[]
      tables.forEach(item=>{
        console.log(item);
        tmp.push({
          id : item.id,
          number : item.number
        })
      })
      console.log(values.number)
      tmp.forEach((num) => { 
        console.log(num.id)
        if (num.number === values.number){
          setIdTable(num.id)
          setFlag(true)
        }
      })
      console.log(flag)
      if (!flag){
        notification.open({
          message: 'error',
          description: 'There is no table with this number!', 
          type:'error',
          style: {borderRadius: '5px', backgroundColor: '#fbc403'}
        });
        return; 
      }
      deleteTable(id_table)
      .then((response) => {
        console.log(response)
        
        setIsRemoveModalOpen(false);
      })
      .catch(function (error) {
        notification.open({
          message: 'Unsuccessful',
          description: error.response.data,
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


      setIsRemoveModalOpen(false);
    };

    return (
        <div className="table-managment">
            <div className="table-list">
                <button className="add" onClick={showModal_add}>add</button>
                <button className="remove" onClick={showModal_rem}>remove</button>
                <TableFormAdd
                  open={isAddModalOpen}
                  onCreate={onCreateTable}
                  onCancel={handleCancel}
                  />
                <TableFormRemove
                  open={isRemoveModalOpen}
                  onCreate={onRemoveTable}
                  onCancel={handleCancel}
                  />
            </div>
        </div>
    )
}