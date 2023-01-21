import React from "react";
import { currentResId } from "../../Services/consts";
import { useEffect , useState } from "react";
import { getTableRestaurant, getUser } from "../../Services/axios";
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
  <Modal className="modal-table-manage" title="Add table" open={open} onCancel={onCancel}
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
              message: 'number!'
            },
          ]}
          >
          <InputNumber className="input1" placeholder="0" min={1} max={20} /*defaultValue={0}*/ onChange={onChange} />
        </Form.Item>

        <Form.Item 
          name="capacity"
          label="capacity"
          rules={[
            {
              required: true,
              message: 'capacity!'
            },
          ]}
          >
          <InputNumber className="input1" placeholder="0" min={1} max={10} /*defaultValue={0}*/ onChange={onChange} />
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
    <Modal className="modal-table-manage" title="remove table" open={open} onCancel={onCancel}
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
          layout='horizontal'
          size='large'
          form={form}
          name="remove_table"
          scrollToFirstError
          >
          <div className="div-form-items-remove">
          <Form.Item className="form-item"
            name="number"
            label="number"
            rules={[
              {
                required: true,
                message: 'number!',
              },
            ]}
          >
            <InputNumber className="input1" placeholder="0" min={1} max={20} /*defaultValue={0}*/ onChange={onChange} />
          </Form.Item>
          </div>
        </Form>
        
    </Modal>
  );
}


/************************************App */
export const Table_managment = () => {

  const [id, setIdRestaurant] = useState(currentResId)

  useEffect(() => {
    getUser()
    .then((res) => {
      console.log(res)
    })
  }, [])

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tables, setTables] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getTableRestaurant(id)
    .then((response)=>{
      console.log("all of tables : ", response.data)
      setTables(response.data)
      console.log('tables list : ',JSON.stringify(tables))
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
  }, [, count])

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
      })

      addTable(data)
      .then((response) => {
        console.log(response)
        setCount(count+1)
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

    const onRemoveTable = (values) => {
      console.log('Received values of form: ', values.number);
      /*const tmp=[]
      tables.forEach(item=>{
        console.log(item);
        tmp.push({
          id : item.id,
          number : item.number
        })
      })*/
      let target_table = 0
      console.log(values.number)
      tables.map(t => {
        if (t.number == values.number){
          target_table = t.id
        }
      })
      deleteTable(target_table)
      .then((response) => {
        console.log(response)
        setCount(count-1)
        notification.open({
          message: 'successful',
          //description: error.response.data,
          type:'success',
          style: {borderRadius: '5px', backgroundColor: '#fbc403'}
        });
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


    const dataGen = () => {
      const tmp=[]
      tables.forEach(t=>{
        console.log(t);
        
        tmp.push(
          <div className="simple-table">
            <div className="tmp">
              <div className="table-items">
                <label className="table-item">NUM : </label>
                <h2 className="table-item">{t.number}</h2>
              </div>
              <div className="table-items">
                <label className="table-item">CAPACITY : </label>
                <h2 className="table-item">{t.capacity}</h2>
              </div>
            </div>
          </div>
        )
      })
      return tmp;
    }

    return (
        <div className="table-managment">
          <div className="table-page-container">
            <div>
              <h1>MANAGE TABLES</h1>
            </div>
            <div className="flex-div-table-addbtn">
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
                  {/*<div>
                    <h2 className="title-tables">Tables</h2>
                  </div>*/}
                  <div className="inner-res-tables">
                    {dataGen()}
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
}