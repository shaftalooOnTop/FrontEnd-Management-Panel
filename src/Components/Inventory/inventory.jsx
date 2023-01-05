import React, { useEffect, useState } from "react";
import { theme, ConfigProvider, Button, Form, Input, Popconfirm, Table } from 'antd';
import ReactDOM from 'react-dom';

import './inventory.css'
import { getInventory } from "../../Services/axios";
import { currentResId } from "../../Services/consts";

export const Inventory = ()=> {

    const [dataSource, setDataSource] = useState([]);

    useEffect(()=> {
        getInventory(currentResId)
        .then((response)=> {
            console.log(response.data)
            setDataSource(response.data)
        })
        .catch((e) => {
            console.log(e)
        })
    },[])
    
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
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
      width: '10%'
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
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
                                onClick={handleAdd}
                                type="primary"
                                style={{
                                marginBottom: 16,
                                }}
                                >
                                Add a row
                            </Button>
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