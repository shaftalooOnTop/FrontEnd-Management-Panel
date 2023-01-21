import React, { useEffect, useState } from "react";
import { theme, ConfigProvider, Button, Form, Input, Popconfirm, Table, notification,
  Modal,
  InputNumber, } from 'antd';
import ReactDOM from 'react-dom';

import './inventory.css'
import { getInventory, addToInventory, deleteFromInventory } from "../../Services/axios";
import { currentResId } from "../../Services/consts";

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
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: 'name!'
            },
          ]}
          >
          <Input style={{width: '100px'}} className="input1" placeholder="name" min={1} max={20} /*defaultValue={0}*/ onChange={onChange} />
        </Form.Item>

        <Form.Item 
          name="count"
          label="count"
          rules={[
            {
              required: true,
              message: 'count!'
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

export const Inventory = ()=> {

  const [id, setIdRestaurant] = useState(currentResId)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(()=> {
      getInventory(currentResId)
      .then((response)=> {
          console.log(response.data)
          setDataSource(response.data)
      })
      .catch((e) => {
          console.log(e)
      })
  },[, count])

  const onAddTpInventory = (values) => {
    console.log('Received values of form: ', values);

    const data = ({
      'restaurantId' : id,
      'name' : values.name,
      'count' : values.count,
    })
    console.log(data)
    addToInventory(data)
    .then((response) => {
      console.log(response)
      // setCount(count+1)
      notification.open({
        message: 'successful',
        //description: error.response.data,
        type:'success',
        style: {borderRadius: '5px', backgroundColor: '#fbc403'}
      });
      setDataSource([...dataSource, data]);
      setCount(count + 1);
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

  const handleCancel = () => {
    setIsAddModalOpen(false);
};
  
  
  const handleDelete = (item) => {
    console.log(item)
    deleteFromInventory(item.id)
    .then((response) => {
      console.log(response)
      setCount(count-1)
      notification.open({
        message: 'successful',
        //description: error.response.data,
        type:'success',
        style: {borderRadius: '5px', backgroundColor: '#fbc403'}
      });
      setCount(count-1)
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
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'count',
      dataIndex: 'count',
      width: '30%'
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
/*const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
*/
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const showModal_add = () => {
    setIsAddModalOpen(true);
};

    return (
        <>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#eeba2c',
                    colorBorder: '#262626',
                },
            }}
            >
            <div className="restaurant-poll-result">
                <div className="inner-restaurant-poll">
                    <div className="restaurant-poll-container">
                        <div>
                            <Button
                                onClick={showModal_add}
                                type="primary"
                                style={{
                                marginBottom: 16,
                                }}
                                >
                                Add a row
                            </Button>
                            <TableFormAdd
                              open={isAddModalOpen}
                              onCreate={onAddTpInventory}
                              onCancel={handleCancel}
                            />
                            <Table
                                /*components={components}*/
                                rowClassName={() => 'editable-row'}
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
        </>
    )
}