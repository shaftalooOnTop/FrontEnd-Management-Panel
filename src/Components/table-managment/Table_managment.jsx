import React from "react";
import { useEffect , useState } from "react";
import { getTableRestaurant } from "../../Services/axios";
import { addTable , deleteTable } from "../../Services/axios";

import {
    notification,
    Modal,
    Form,
    InputNumber,
  } from 'antd';

import './table-managment.css'
import 'antd/dist/reset.css';


/*************************************form add table */
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
      
      <Form className='form1'
        name="add_table"
        layout='horizontal'
        size='large'
        form={form}
        scrollToFirstError
        >
        
        <div className="div-form-items-add">
        <Form.Item 
          name="number"
          label="number"
          rules={[
            {
              required: true,
              message: 'Please input table number!'
            },
          ]}
          >
          <InputNumber className="input1" min={1} max={20} defaultValue={0} onChange={onChange} />
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
          <InputNumber className="input1" min={1} max={10} defaultValue={0} onChange={onChange} />
        </Form.Item>
        </div>

      </Form>
  </Modal>
);
}

/*************************************form remove table */
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
        <Form className='form1'
          layout='horizontal'
          size='large'
          form={form}
          name="remove_table"
          scrollToFirstError
          >

          <Form.Item className="form-item"
            name="number"
            label="number"
            rules={[
              {
                required: true,
                message: 'Please input table number!',
              },
            ]}
          >
            <InputNumber className="input1" min={1} max={20} defaultValue={0} onChange={onChange} />
          </Form.Item>
        </Form>
        </div>
        
    </Modal>
  );
}


/************************************App */
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
        'capacity' : values.capacity,
        "reserveTables" : []
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
          <div className="table-page-container">
            <div>
              <h1>RESTAURANT TABLES</h1>
            </div>
            <div className="add-remove-table">
                <button className="add" onClick={showModal_add}>Add table</button>
                <button className="remove" onClick={showModal_rem}>Remove table</button>
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
            <div className="res_tables">
                <div className="inner-res-tables">

                  <div className="table">
                    <div className="tmp">
                      <div className="table-items">
                        <label className="table-item">NUM : </label>
                        <h2 className="table-item">3</h2>
                      </div>
                      <div className="table-items">
                        <label className="table-item">CAPACITY : </label>
                        <h2 className="table-item">15</h2>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
          </div>
        </div>
    )
}